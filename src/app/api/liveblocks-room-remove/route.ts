import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  try {
    const { roomId } = await request.json();

    if (!roomId) {
      return new NextResponse("Room ID is required", { status: 400 });
    }

    await liveblocks.deleteRoom(roomId);

    return new NextResponse("Room deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting Liveblocks room:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}