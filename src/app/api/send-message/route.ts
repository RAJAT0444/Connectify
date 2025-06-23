// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";

// import { Message } from "@/model/User";

// export async function POST(request: Request) {
//     await dbConnect();

//     const { username, content } = await request.json();
//     try {
//         const user = await UserModel.findOne({ username });
//         if (!user) {
//             return Response.json(
//                 { message: "User not found", success: false },
//                 { status: 404 }
//             );
//         }

//         // is user accepting messages
//         if (!user.isAcceptingMessages) {
//             return Response.json(
//                 { message: "User not accepting messages", success: false },
//                 { status: 403 }
//             );
//         }

//         const newMessage = { content, createdAt: new Date() };
//         user.messages.push(newMessage as Message);
//         await user.save();
//         return Response.json(
//             {
//                 message: "Message sent successfully",
//                 success: true,
                
//             },
//             { status: 200 }
            
//         )
    

//     } catch (error) {
//         console.error("Error sending message:", error);
//         return Response.json(
//             { message: "Internal server error", success: false },
//             { status: 500 }
//         );
//     }
// }








import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { isMessageClean } from "@/lib/filter"; // ✅ Add filter
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

    // ❌ Not accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User not accepting messages", success: false },
        { status: 403 }
      );
    }

    // ❌ Filter: Bad words
    if (!isMessageClean(content)) {
      return Response.json(
        { message: "Inappropriate message detected", success: false },
        { status: 400 }
      );
    }

    // 🌐 Optional: Get IP and User-Agent (if needed for logging/audit)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // ✅ Save message
    const newMessage = {
  content,
  createdAt: new Date(),
  ipAddress: ip,
  userAgent,
};


    user.messages.push(newMessage);
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
