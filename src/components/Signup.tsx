"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (json.message) {
      console.log(json);
      setError(json.message);
      setEmail("");
      setPassword("");
      setLoading(false);
    } else {
      setError(null);
      setEmail("");
      setPassword("");
      setLoading(false);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: process.env.BASE_URL as string,
      });
      router.push("/profile");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        className="w-[600px] border mx-auto p-4 rounded-md flex flex-col gap-4"
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          className="p-2 rounded bg-gray-100 outline-none"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="p-2 rounded bg-gray-100 outline-none"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-yellow-400 p-3 text-white w-fit mx-auto">
          {loading ? "Creating ..." : "Create account"}
        </button>
        {error && (
          <div className="p-2 rounded w-fit mx-auto text-white bg-red-500 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
