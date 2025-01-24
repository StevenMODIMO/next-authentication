"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: process.env.BASE_URL as string,
    });
    if (response?.error) {
      setError(response.error);
      setEmail("");
      setPassword("");
      setLoading(false);
    } else {
      setError(null);
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/profile");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        className="flex flex-col gap-3 w-[600px] mx-auto border border-r-gray-400 p-3 rounded-md hover:shadow-lg"
      >
        <label htmlFor="email">Enter email</label>
        <input
          type="text"
          id="email"
          className="p-2 rounded-md outline-none bg-gray-100"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          id="password"
          className="p-2 rounded-md outline-none bg-gray-100"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-yellow-400 p-2 rounded w-fit mx-auto">
          {loading ? "loading..." : "Log In"}
        </button>
        {error && (
          <div className="p-2 rounded bg-red-400 text-white text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
