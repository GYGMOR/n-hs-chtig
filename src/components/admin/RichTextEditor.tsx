"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  Bold, Italic, Underline, List, ListOrdered,
  Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, Quote
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type FormatCommand =
  | "bold" | "italic" | "underline"
  | "insertUnorderedList" | "insertOrderedList"
  | "justifyLeft" | "justifyCenter" | "justifyRight"
  | "formatBlock";

const tools: {
  title: string;
  icon: React.ElementType;
  cmd: FormatCommand;
  arg?: string;
}[] = [
  { title: "Fett",           icon: Bold,           cmd: "bold" },
  { title: "Kursiv",         icon: Italic,         cmd: "italic" },
  { title: "Unterstrichen",  icon: Underline,      cmd: "underline" },
  { title: "Überschrift 2",  icon: Heading2,       cmd: "formatBlock", arg: "h2" },
  { title: "Überschrift 3",  icon: Heading3,       cmd: "formatBlock", arg: "h3" },
  { title: "Liste",          icon: List,           cmd: "insertUnorderedList" },
  { title: "Numm. Liste",    icon: ListOrdered,    cmd: "insertOrderedList" },
  { title: "Links",          icon: AlignLeft,      cmd: "justifyLeft" },
  { title: "Zentriert",      icon: AlignCenter,    cmd: "justifyCenter" },
  { title: "Rechts",         icon: AlignRight,     cmd: "justifyRight" },
  { title: "Zitat",          icon: Quote,          cmd: "formatBlock", arg: "blockquote" },
];

export default function RichTextEditor({ value, onChange, placeholder = "Beschreibung eingeben …" }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      const el = editorRef.current;
      if (el.innerHTML !== value) {
        el.innerHTML = value;
      }
    }
  }, [value]);

  const exec = useCallback((cmd: FormatCommand, arg?: string) => {
    editorRef.current?.focus();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).execCommand(cmd, false, arg ?? undefined);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
      isInternalChange.current = false;
    }
  }, [onChange]);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:border-gray-900 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {tools.map((tool) => (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            onMouseDown={(e) => {
              e.preventDefault();
              exec(tool.cmd, tool.arg);
            }}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            <tool.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          if (editorRef.current) {
            isInternalChange.current = true;
            onChange(editorRef.current.innerHTML);
            isInternalChange.current = false;
          }
        }}
        data-placeholder={placeholder}
        className="min-h-[160px] p-4 text-sm text-gray-900 outline-none
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
          empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
      />
    </div>
  );
}
