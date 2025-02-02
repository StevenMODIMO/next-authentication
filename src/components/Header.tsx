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
    <div className="flex gap-4 items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <IoHomeOutline />
        <p>Home</p>
      </Link>
      {session?.user ? (
        <>
          <Link href="/profile" className="flex items-center gap-2">
            <FaRegCircleUser />
            <p>Profile</p>
          </Link>
          <button
            className="bg-yellow-400 p-2 rounded flex items-center gap-2 justify-center"
            onClick={() => signOut()}
          >
            <IoMdLogOut />
            <p>Log out</p>
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" className="flex items-center gap-2">
            <MdOutlineNewLabel />
            <p>Signup</p>
          </Link>
          <Link href="/login" className="flex items-center gap-2">
            <IoMdLogIn />
            <p>Login</p>
          </Link>
        </>
      )}
    </div>
  );
}
