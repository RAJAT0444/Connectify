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

    // Agar user message accept nahi kar raha
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User not accepting messages", success: false },
        { status: 403 }
      );
    }

    // Message filter
    if (!isMessageClean(content)) {
      return Response.json(
        { message: "Inappropriate message detected", success: false },
        { status: 400 }
      );
    }

    // IP address & User-Agent le lo
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Message push karo (as any cast kar ke)
    user.messages.push({
      content,
      createdAt: new Date(),
      ipAddress: ip,
      userAgent,
    } as any);

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
