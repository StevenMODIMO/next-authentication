import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>{session?.user.email}</p>
      <Image
        src={session?.user.image}
        alt={session?.user.email}
        width={424}
        height={24}
      />
    </div>
  );
}
