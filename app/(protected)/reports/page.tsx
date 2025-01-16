"use client";

import { TextEditor } from "@/components/text-editor";
import { useState } from "react";

export default function Reports() {
  const [value, setValue] = useState("");

  return (
    <div>
      <TextEditor
        menubar
        value={value}
        onChange={(value) => setValue(value.toString())}
      />
    </div>
  );
}
