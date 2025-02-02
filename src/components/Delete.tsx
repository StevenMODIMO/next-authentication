"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Delete() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  return (
    <div>
      <p>{session?.user.id}</p>
      <form>
        <input />
        <button>Delete account</button>
      </form>
    </div>
  );
}