import LoginForm from "@/components/Login";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log In",
};
export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");
  return (
    <div className="w-[90%] mx-auto">
      <header className="text-center font-semibold my-4 text-xl">
        <h1>Log in to continue</h1>
      </header>
      <LoginForm />
    </div>
  );
}
