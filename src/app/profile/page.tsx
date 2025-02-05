import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import Delete from "@/components/Delete";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-[90%] sm:w-96 mx-auto text-gray-500">
      <div className="relative w-24 h-24 rounded-full mx-auto border-2 border-orange-400 p-2">
        <Image
          src={session?.user.image ?? "/next.svg"}
          alt={session?.user.email ?? "profile"}
          fill
          className="rounded-full p-4"
        />
      </div>
      <section>
        <p>
          <span className="font-bold">Email:</span> {session?.user.email}
        </p>
        <p>
          <span className="font-bold">ID:</span> {session?.user.id}
        </p>
      </section>
      <Delete />
    </div>
  );
}
