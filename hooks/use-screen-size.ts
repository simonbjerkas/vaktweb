import { useEffect, useState } from "react";

const MOBILE_WIDTH = 768;
const TABLET_WIDTH = 1024;

type Device = "mobile" | "tablet" | "desktop";

export function useScreenSize() {
  const [isScreenSize, setIsScreenSize] = useState<Device>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth < MOBILE_WIDTH) {
        setIsScreenSize("mobile");
      } else if (window.innerWidth < TABLET_WIDTH) {
        setIsScreenSize("tablet");
      } else {
        setIsScreenSize("desktop");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (typeof window === "undefined") return "desktop";
  return isScreenSize;
}
