"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex gap-4 items-center p-4">
      <Link href="/">Home</Link>
      {session?.user ? (
        <>
          <Link href="/profile">Profile</Link>
          <button
            className="bg-yellow-400 p-2 rounded"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}
