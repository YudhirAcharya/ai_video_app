import { error } from "console";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User alreday registered" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User registerd successfully" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Registration error");

    return NextResponse.json(
      { error: "Failed user registeration" },
      { status: 400 }
    );
  }
}
