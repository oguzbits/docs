"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import type { api } from "@/../convex/_generated/api";

import { Editor } from "./editor";
import { Room } from "./room";


interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
  roomId: string;
}

export const Document = ({ preloadedDocument, roomId }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  if (document === null) return null;

  return (
    <Room roomId={roomId}>
      <div className="min-h-screen bg-[#fafbfd]">
        <Editor initialContent={document.initialContent} data={document} />
      </div>
    </Room>
  );
};
