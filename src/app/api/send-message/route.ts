import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { isMessageClean } from "@/lib/filter";
import { NextRequest } from "next/server";

// Import Message type correctly from mongoose
import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  ipAddress: { type: String, default: "unknown" },
  userAgent: { type: String, default: "unknown" },
});

type MessageType = mongoose.InferSchemaType<typeof MessageSchema>;

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

    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User not accepting messages", success: false },
        { status: 403 }
      );
    }

    if (!isMessageClean(content)) {
      return Response.json(
        { message: "Inappropriate message detected", success: false },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const message: MessageType = {
      content,
      createdAt: new Date(),
      ipAddress: ip,
      userAgent,
    };

    user.messages.push(message);
    await user.save();

    return Response.json(
      {
        message: "Message sent successfully",
        success: true,
      },
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
