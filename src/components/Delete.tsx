"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Delete() {
  const { data: session } = useSession();
  return (
    <div>
      <button className="bg-red-400 w-fit text-white">Delete</button>
    </div>
  );
}
