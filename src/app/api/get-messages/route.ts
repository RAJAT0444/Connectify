// import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/model/User';
// import mongoose from 'mongoose';
// import { User } from 'next-auth';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]/options';

// export async function GET(request: Request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   const _user: User = session?.user as User;

//   if (!session || !_user) {
//     return Response.json(
//       { success: false, message: 'Not authenticated' },
//       { status: 401 }
//     );
//   }
//   const userId = new mongoose.Types.ObjectId(_user._id);
//   try {
//     const user = await UserModel.aggregate([
//       { $match: { _id: userId } },
//       { $unwind: '$messages' },
//       { $sort: { 'messages.createdAt': -1 } },
//       { $group: { _id: '$_id', messages: { $push: '$messages' } } },
//     ]).exec();

//     if (!user || user.length === 0) {
//       return Response.json(
//         { message: 'User not found', success: false },
//         { status: 404 }
//       );
//     }

//     return Response.json(
//       { messages: user[0].messages },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error('An unexpected error occurred:', error);
//     return Response.json(
//       { message: 'Internal server error', success: false },
//       { status: 500 }
//     );
//   }
// }




















import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

<<<<<<< HEAD
export async function GET(request: Request) {
=======
export async function GET() {
>>>>>>> aed1ac6 (Initial commit)
  try {
    // DB connect karo
    await dbConnect();

    // Session le request se, authOptions pass karo
    const session = await getServerSession(authOptions);

    // Agar session ya user nahi hai toh error bhejo
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // User ID MongoDB ObjectId mein convert karo
    const userId = new mongoose.Types.ObjectId(session.user._id);

    // Aggregation se user ke messages fetch karo, latest order mein
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]).exec();

    // Agar user nahi mila toh 404 bhejo
    if (!user || user.length === 0) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Success ke saath messages bhejo
    return NextResponse.json(
      { messages: user[0].messages },
      { status: 200 }
    );

  } catch (error) {
    console.error('An unexpected error occurred:', error);

    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
