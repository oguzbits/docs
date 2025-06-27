"use client";

import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsFilePdf } from "react-icons/bs";

import { DocumentInput } from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";

export const Navbar = () => {
  const { editor } = useEditorStore();

  interface InsertTableProps {
    rows: number;
    cols: number;
  }

  const insertTable = ({ rows, cols }: InsertTableProps) => {
    editor?.commands.insertTable({ rows, cols, withHeaderRow: false });
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;

    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, `document.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, `document.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, `document.txt`);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Docs Logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col">
          <DocumentInput />

          <div className="flex">
            <Menubar className="h-auto border-none bg-transparent p-0 shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                  File
                </MenubarTrigger>

                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="mr-2 size-4" /> Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="mr-2 size-4" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="mr-2 size-4" />
                        HTML
                      </MenubarItem>

                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="mr-2 size-4" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="mr-2 size-4" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <FilePlusIcon className="mr-2 size-4" /> New Document
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                  Edit
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarItem
                    disabled={!editor?.can().undo()}
                    onClick={() => editor?.commands.undo()}
                  >
                    <Undo2Icon className="mr-2 size-4" />
                    Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem
                    disabled={!editor?.can().redo()}
                    onClick={() => editor?.commands.redo()}
                  >
                    <Redo2Icon className="mr-2 size-4" />
                    Redo
                    <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                  Insert
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>

                    <MenubarSubContent>
                      {Array.from({ length: 4 }, (_, i) => i + 1).map((n) => (
                        <MenubarItem
                          key={n}
                          onClick={() => insertTable({ rows: n, cols: n })}
                        >
                          {n} x {n}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                  Format
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="mr-2 size-4" />
                      Text
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem
                        disabled={!editor?.can().toggleBold()}
                        onClick={() => editor?.commands.toggleBold()}
                      >
                        <BoldIcon className="mr-2 size-4" />
                        Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        disabled={!editor?.can().toggleItalic()}
                        onClick={() => editor?.commands.toggleItalic()}
                      >
                        <ItalicIcon className="mr-2 size-4" />
                        Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        disabled={!editor?.can().toggleUnderline()}
                        onClick={() => editor?.commands.toggleUnderline()}
                      >
                        <UnderlineIcon className="mr-2 size-4" />
                        Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        disabled={!editor?.can().toggleStrike()}
                        onClick={() => editor?.commands.toggleStrike()}
                      >
                        <StrikethroughIcon className="mr-2 size-4" />
                        Strikethrough&nbsp;&nbsp;
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem
                    disabled={!editor?.can().unsetAllMarks()}
                    onClick={() => editor?.commands.unsetAllMarks()}
                  >
                    <RemoveFormattingIcon className="mr-2 size-4" />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
