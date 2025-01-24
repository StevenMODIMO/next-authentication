import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import { dbConnect } from "@/lib/db";
import { isEmail, isStrongPassword } from "validator";
import { hash, genSalt } from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await dbConnect();

  if (!email || !password) {
    return NextResponse.json({ message: "All fields must be filled" });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Invalid email" });
  }

  if (!isStrongPassword(password)) {
    return NextResponse.json({ messag: "Weak password" });
  }

  const exists = await User.findOne({ email });

  if (exists) {
    return NextResponse.json({ message: "Email already in use" });
  }

  const salt = await genSalt();
  const hashed = await hash(password, salt);

  try {
    const user = await User.create({ email, password: hashed });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const query = searchParams.get("query");

  try {
    const deleted = await User.findOneAndDelete(
      { email: query },
      { new: true }
    );
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}
