"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Delete() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch(
      `/api/auth/signup/?query=${session?.user.email}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      await signOut({ redirect: false });
      router.push("/signup");
    } else {
      console.log(json.message);
    }
  };
  return (
    <div>
      <p>{session?.user.id}</p>
      <button
        className="rounded bg-red-300 p-2 text-white"
        onClick={handleSubmit}
      >
        Delete account
      </button>
    </div>
  );
}
