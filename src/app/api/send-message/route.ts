import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { isMessageClean } from "@/lib/filter";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Check if user is accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User not accepting messages", success: false },
        { status: 403 }
      );
    }

    // Filter inappropriate content
    if (!isMessageClean(content)) {
      return Response.json(
        { message: "Inappropriate message detected", success: false },
        { status: 400 }
      );
    }

    // Get metadata (IP + user-agent)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Add message to user's message list
    user.messages.push({
      content,
      createdAt: new Date(),
      ipAddress: ip,
      userAgent,
    });

    await user.save();

    return Response.json(
      { message: "Message sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
