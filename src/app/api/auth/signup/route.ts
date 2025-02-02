import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";
import { dbConnect } from "@/lib/db";
import { isEmail, isStrongPassword } from "validator";
import { hash, genSalt } from "bcrypt";
import { put, del } from "@vercel/blob";

export async function GET(req: NextRequest) {
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Failed to fetch users", error });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const image = formData.get("image") as File;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ message: "Invalid input types" });
  }

  await dbConnect();

  if (!email || !password) {
    return NextResponse.json({ message: "All fields must be filled" });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Invalid email" });
  }

  if (!isStrongPassword(password)) {
    return NextResponse.json({ message: "Weak password" });
  }

  const exists = await User.findOne({ email });

  if (exists) {
    return NextResponse.json({ message: "Email already in use" });
  }

  const salt = await genSalt();
  const hashed = await hash(password, salt);

  let imageUrl = null;

  if (image instanceof File) {
    try {
      const { url } = await put(`next-auth/${image.name}`, image, {
        access: "public",
      });
      imageUrl = url;
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      return NextResponse.json({ message: "Image upload failed" });
    }
  }

  try {
    const user = await User.create({
      email,
      password: hashed,
      image: imageUrl,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ message: "Failed to create user", error });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  try {
    const deleted = await User.findOneAndDelete(
      { email: query },
      { new: true }
    );
    if(deleted.image) await del(deleted.image);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user", error });
  }
}