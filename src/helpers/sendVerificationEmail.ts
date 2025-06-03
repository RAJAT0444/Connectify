import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse<Message>> {
  try {
    await resend.emails.send({
      from: "verify@conreach.in", // ✅ Must match verified sender in Resend dashboard
      to: email,
      subject: "Verification Email",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError); // ✅ Add this for debugging
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
