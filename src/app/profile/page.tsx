import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import Delete from "@/components/Delete"

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-[90%] sm:w-96 mx-auto">
      <p>{session?.user.email}</p>
      <Image
        src={session?.user.image ?? "/next.svg"}
        alt={session?.user.email ?? "profile"}
        width={424}
        height={24}
      />
      <Delete />
    </div>
  );
}
