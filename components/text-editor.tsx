"use client";

import { cn } from "@/lib/utils";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import { Button } from "./ui/button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  PencilIcon,
  CrossIcon,
  HighlighterIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

export const editorContentStyle = cn(
  "prose prose-sm",
  "prose-h1:text-xl prose-h1:pb-2 prose-h1:font-bold",
  "prose-h2:text-lg prose-h2:pb-1 prose-h2:font-bold",
  "prose-h3:text-md prose-h3:font-bold",
  "focus:outline-none min-w-full overflow-y-auto max-w-none",
  "[&>*]:!m-0 [&_*]:!m-0",
);

export const TextEditor = ({
  className,
  placeholder,
  menubar = false,
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  placeholder?: string;
  menubar?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none",
        placeholder: placeholder ?? "Write something...",
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
    ],
    content: value ?? "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(editorContentStyle, "min-h-48"),
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {menubar && editor && <TextEditorMenu editor={editor} />}
      <div
        className={cn(
          "flex rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
      >
        <EditorContent className="flex-1 min-h-full" editor={editor} />
      </div>
    </div>
  );
};

export const TextEditorMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("bold") ? "secondary" : "outline"}
          aria-label="Toggle bold font."
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("italic") ? "secondary" : "outline"}
          aria-label="Toggle italic font."
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("underline") ? "secondary" : "outline"}
          aria-label="Toggle underline font."
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </Button>
      </li>
      <li>
        <ColorButton editor={editor} />
      </li>
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("highlight") ? "secondary" : "outline"}
          aria-label="Toggle highlight font."
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <HighlighterIcon />
        </Button>
      </li>
    </ul>
  );
};

function activeColor(editor: Editor) {
  return editor.isActive("textStyle")
    ? editor.getAttributes("textStyle").color
    : null;
}

const ColorButton = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            activeColor(editor) === "red" && "bg-red-500 hover:bg-red-400",
            activeColor(editor) === "green" &&
              "bg-green-500 hover:bg-green-400",
            activeColor(editor) === "blue" && "bg-blue-500 hover:bg-blue-400",
          )}
          size="icon"
          variant="outline"
          aria-label="Change text color."
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PencilIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="-translate-x-1"
        sideOffset={10}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-2">
          <ul className="flex items-center gap-2">
            <li
              className={cn(
                "cursor-pointer size-5 transition-transform hover:scale-110 bg-red-500",
                activeColor(editor) === "red" &&
                  "hover:scale-100 animate-pulse-light",
              )}
              onClick={() => editor.chain().focus().setColor("red").run()}
            >
              <span className="sr-only">Red</span>
            </li>
            <li
              className={cn(
                "cursor-pointer size-5 transition-transform hover:scale-110 bg-green-500",
                activeColor(editor) === "green" &&
                  "hover:scale-100 animate-pulse-light",
              )}
              onClick={() => editor.chain().focus().setColor("green").run()}
            >
              <span className="sr-only">Green</span>
            </li>
            <li
              className={cn(
                "cursor-pointer size-5 transition-transform hover:scale-110 bg-blue-500",
                activeColor(editor) === "blue" &&
                  "hover:scale-100 animate-pulse-light",
              )}
              onClick={() => editor.chain().focus().setColor("blue").run()}
            >
              <span className="sr-only">Blue</span>
            </li>
          </ul>
          <Button
            type="button"
            variant="secondary"
            className="w-full justify-start gap-2 text-sm transition-transform hover:scale-x-105"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            <CrossIcon className="size-4" />
            <span>Remove color</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
