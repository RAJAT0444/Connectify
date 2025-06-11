
// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const { username, email, password } = await request.json();

//     // Check if username is taken by verified user
//     const existingVerifiedUserByUsername = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });

//     if (existingVerifiedUserByUsername) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Username is already taken",
//         },
//         { status: 400 }
//       );
//     }

//     // Check if user with email exists
//     const existingUserByEmail = await UserModel.findOne({ email });
//     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

//     if (existingUserByEmail) {
//       if (existingUserByEmail.isVerified) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "User already exists with this email",
//           },
//           { status: 400 }
//         );
//       } else {
//         // Update existing unverified user data
//         const hashedPassword = await bcrypt.hash(password, 10);
//         existingUserByEmail.password = hashedPassword;
//         existingUserByEmail.verifyCode = verifyCode;
//         existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000); // 1 hour expiry
//         existingUserByEmail.isVerified = false; // Make sure user is unverified
//         await existingUserByEmail.save();
//       }
//     } else {
//       // Create new user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expiryDate = new Date(Date.now() + 3600000); // 1 hour expiry

//       const newUser = new UserModel({
//         username,
//         email,
//         password: hashedPassword,
//         verifyCode,
//         verifyCodeExpire: expiryDate,
//         isVerified: false,
//         isAccountVerified: false, // Not verified yet
//         isAcceptingMessages: true,
//         messages: [],
//       });

//       await newUser.save();
//     }

//     // Send verification email
//     const emailResponse = await sendVerificationEmail(email, username, verifyCode);

//     if (!emailResponse.success) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: emailResponse.message,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "User registered successfully. Please verify your account.",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error registering user",
//       },
//       { status: 500 }
//     );
//   }
// }




















// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(request: Request) {
//   await dbConnect();
//   console.log("✅ Connected to DB");

//   try {
//     const body = await request.json();
//     console.log("📥 Request Body:", body);

//     const { username, email, password } = body;

//     if (!username || !email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const existingVerifiedUserByUsername = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });

//     console.log("🔍 Checked existing username:", existingVerifiedUserByUsername);

//     if (existingVerifiedUserByUsername) {
//       return NextResponse.json(
//         { success: false, message: "Username is already taken" },
//         { status: 400 }
//       );
//     }

//     const existingUserByEmail = await UserModel.findOne({ email });
//     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

//     if (existingUserByEmail) {
//       if (existingUserByEmail.isVerified) {
//         return NextResponse.json(
//           { success: false, message: "User already exists with this email" },
//           { status: 400 }
//         );
//       } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         existingUserByEmail.password = hashedPassword;
//         existingUserByEmail.verifyCode = verifyCode;
//         existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);
//         existingUserByEmail.isVerified = false;

//         try {
//           await existingUserByEmail.save();
//           console.log("💾 Updated unverified user saved");
//         } catch (err) {
//           console.error("❌ Error saving updated user:", err);
//         }
//       }
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expiryDate = new Date(Date.now() + 3600000);

//       const newUser = new UserModel({
//         username,
//         email,
//         password: hashedPassword,
//         verifyCode,
//         verifyCodeExpire: expiryDate,
//         isVerified: false,
//         isAccountVerified: false,
//         isAcceptingMessages: true,
//         messages: [],
//       });

//       try {
//         await newUser.save();
//         console.log("💾 New user saved:", newUser._id);
//       } catch (err) {
//         console.error("❌ Error saving new user:", err);
//         return NextResponse.json(
//           { success: false, message: "Error saving new user" },
//           { status: 500 }
//         );
//       }
//     }

//     const emailResponse = await sendVerificationEmail(email, username, verifyCode);
//     console.log("📧 Email response:", emailResponse);

//     if (!emailResponse.success) {
//       return NextResponse.json(
//         { success: false, message: emailResponse.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "User registered successfully. Please verify your account.",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error in POST handler:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }











import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  try {
    await dbConnect();
    console.log("✅ Connected to DataBase");

    const body = await request.json();
    // console.log("📥 Request Body:", body);

    const { username, email, password } = body;

    // Validate input fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check for existing verified user with same username
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 409 } // 409 Conflict is more appropriate for duplicate resources
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          { success: false, message: "User already exists with this email" },
          { status: 409 }
        );
      } else {
        // Update existing unverified user
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
        console.log("💾 Updated unverified user saved");
      }
    } else {
      // Create new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpire: new Date(Date.now() + 3600000),
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
      console.log("💾 New user saved:", newUser._id);
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: emailResponse.message || "Failed to send verification email" 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in user registration:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}