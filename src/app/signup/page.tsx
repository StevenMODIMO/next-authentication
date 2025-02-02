import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import SignupForm from "@/components/Signup"

export const metadata: Metadata = {
  title: "Signup",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");
  return (
    <div className="w-[90%] mx-auto md:mt-20">
      <header className="text-center font-semibold my-4 text-xl">
        <h1>Get started now.</h1>
      </header>
      <SignupForm />
    </div>
  );
}
