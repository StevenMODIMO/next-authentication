"use client";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineNewLabel } from "react-icons/md";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex gap-4 items-center p-2 bg-white rounded-2xl mx-auto w-fit m-2">
      <Link href="/" className="flex items-center gap-2">
        <IoHomeOutline />
        <p>Home</p>
      </Link>
      {session?.user ? (
        <>
          <Link href="/profile" className="flex items-center gap-1">
            <FaRegCircleUser />
            <p>Profile</p>
          </Link>
          <button
            className="bg-yellow-400 p-1 rounded-2xl flex items-center gap-1 justify-center"
            onClick={() => signOut()}
          >
            <IoMdLogOut />
            <p>Log out</p>
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" className="flex items-center gap-1">
            <MdOutlineNewLabel />
            <p>Signup</p>
          </Link>
          <Link href="/login" className="flex items-center gap-1">
            <IoMdLogIn />
            <p>Login</p>
          </Link>
        </>
      )}
    </div>
  );
}
