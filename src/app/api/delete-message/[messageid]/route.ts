import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { authOptions } from '../../auth/[...nextauth]/options';
import { NextRequest } from 'next/server';
import { User } from 'next-auth';

// Define extended user type safely
interface ExtendedUser extends User {
  id: string;
  _id: string;
}

export async function DELETE(
  request: NextRequest,
  context: { params: { messageid: string } }
) {
  const { messageid } = context.params;

  await dbConnect();

  const session = await getServerSession(authOptions);

  const user = session?.user as ExtendedUser | undefined;

  if (!session || !user || !user._id) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
