import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");
  return (
    <div>
      <header>
        <h1>Signup Now</h1>
      </header>
    </div>
  );
}
