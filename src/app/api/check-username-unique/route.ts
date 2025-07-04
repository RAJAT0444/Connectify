import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation,

})

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        }

        // Validate with zod
        const result = usernameQuerySchema.safeParse(queryParam);
        if (!result.success) {
            const usernameErrors = result.error.format();
            const errors = usernameErrors.username?._errors || [];

            return Response.json({
                success: false,
                message: errors.length > 0 ? errors.join(', ') : "Invalid username",
            }, { status: 400 });
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne
        ({
            username, isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already taken",
            }, { status: 409 });
        }

        return Response.json({
            success: true,
            message: "Username is available",
        }, { status: 200 });


    } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return Response.json({
            success: false,
            message: "Error checking username uniqueness",
        },
        )
    }
}