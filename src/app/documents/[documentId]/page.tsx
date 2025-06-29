import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

import type { Id } from "@/../convex/_generated/dataModel";

import { api } from "../../../../convex/_generated/api";
import { Document } from "./document";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) throw new Error("Unauthorized!");

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token },
  );

  // Check if the document exists. If not, redirect to the homepage.
  if (!preloadedDocument?._valueJSON) {
    redirect("/");
  }

  return <Document preloadedDocument={preloadedDocument} roomId={documentId} />;
};
export default DocumentIdPage;
