"use client";

import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import Document from "@tiptap/extension-document";

import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import { editorMargin, editorWidth } from "@/config/editor";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { Doc } from "../../../../convex/_generated/dataModel";

interface EditorProps {
  initialContent?: string;
  data: Doc<"documents">;
}

export const Editor = ({ initialContent, data }: EditorProps) => {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    content: initialContent,
    onCreate: ({ editor }) => {
      editor?.commands.setFontFamily("Arial");
      if (initialContent && editor.isEmpty) {
        editor?.commands.setContent(initialContent);
      }
    },
    autofocus: true,
    editorProps: {
      attributes: {
        style: `width: ${editorWidth}px; padding-left: ${editorMargin}px; padding-right: ${editorMargin}px`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] py-10 pr-14 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit,
      LineHeightExtension,
      FontSizeExtension,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      TextStyle,
      Underline,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({ nested: true }),
      TaskList,
      Superscript,
      Subscript,
    ],
    immediatelyRender: false, // true if client side rendering
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className="fixed inset-x-0 top-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden">
          <Navbar data={data} editor={editor} />
          <Toolbar />
        </div>

        <div className="flex justify-center pt-[114px] print:pt-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </EditorContext.Provider>
  );
};
