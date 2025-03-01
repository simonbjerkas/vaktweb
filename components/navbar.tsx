"use client";

import { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import {
  HouseIcon as HomeIcon,
  PlayIcon as ScreeningIcon,
  FileIcon as ReportIcon,
  UserIcon as EmployeeIcon,
  CalendarIcon,
  MenuIcon as HamburgerMenuIcon,
  XIcon as Cross1Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useScreenSize } from "@/hooks/use-screen-size";

import Link from "next/link";

const links = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon className="size-4" />,
    children: [
      {
        href: "/news",
        label: "News",
        description:
          "All news relevant for this timeperiod goes here. Potential AI summary perhaps?",
        className: "col-span-1 row-span-2",
      },
      { href: "/news/today", label: "Today", description: "Today's news" },
      { href: "/news/weekly", label: "Weekly", description: "Weekly news" },
    ],
  },
  {
    href: "/shifts",
    label: "Shifts",
    icon: <CalendarIcon className="size-4" />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <ReportIcon className="size-4" />,
  },
  {
    href: "/screenings",
    label: "Screenings",
    icon: <ScreeningIcon className="size-4" />,
  },
  {
    href: "/employees",
    label: "Employees",
    icon: <EmployeeIcon className="size-4" />,
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {screenSize === "mobile" || screenSize === "tablet" ? (
        <>
          <Button
            className={cn(
              "z-50",
              screenSize === "tablet" && "absolute right-4",
              screenSize === "mobile" && "fixed bottom-4 right-4",
            )}
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Cross1Icon className="size-4" />
            ) : (
              <HamburgerMenuIcon className="size-4" />
            )}
          </Button>
          <div
            className={cn(
              "fixed inset-0 bg-gradient-to-b from-background/40 to-background to-60% backdrop-blur-sm z-40",
              isOpen
                ? "opacity-100 translate-y-0 duration-300"
                : "opacity-0 -translate-y-full duration-100 pointer-events-none aria-hidden",
            )}
          >
            <ul className="p-4 pb-16 container mx-auto flex flex-col gap-4 h-full">
              <div className="flex-1"></div>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 p-4 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                  {link.children && (
                    <ul className="pl-8 flex flex-col gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block p-2 hover:bg-accent rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <h2 className="font-medium">{child.label}</h2>
                          {child.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        // Desktop Navigation
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => {
              return (
                <NavigationMenuItem key={link.href}>
                  {link.children ? (
                    <>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuTrigger className="cursor-pointer">
                          <span className="mr-2">{link.icon}</span>
                          {link.label}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {link.children.map((child) => (
                            <li
                              key={child.href}
                              className={cn(child.className, "p-2 rounded")}
                            >
                              <Link
                                href={child.href}
                                className="space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                legacyBehavior
                                passHref
                              >
                                <NavigationMenuLink>
                                  <h2 className="text-sm font-medium leading-none">
                                    {child.label}
                                  </h2>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink className="flex flex-row items-center">
                        <span className="mr-2">{link.icon}</span>
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
};
