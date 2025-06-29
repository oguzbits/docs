"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
}

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  // @ts-expect-error Used sessionClaims?.o?.id instead of sessionClaims?.org_id
  const organizationId = sessionClaims?.o?.id
    ? // @ts-expect-error Used sessionClaims?.o?.id instead of sessionClaims?.org_id
      [sessionClaims.o.id]
    : undefined;
  const response = await clerk.users.getUserList({
    organizationId,
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}

export const removeRoom = async (documentId: string, appUrl: string) => {
  try {
    await fetch(`${appUrl}/api/liveblocks-room-remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: documentId }),
    });
  } catch (error) {
    console.error("Failed to remove room:", error);
  }
};
