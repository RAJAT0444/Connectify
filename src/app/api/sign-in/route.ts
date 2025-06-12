


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// Update the import path below to the correct relative path if needed
import connectToDB from '@/lib/dbConnect'; // apni DB connection helper
import User from '@/model/User'; // Mongoose User model

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'No user found with this email' }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email first' }, { status: 403 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    // Create session or token logic here (JWT or NextAuth session)
    // For simplicity, just sending success message
    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
