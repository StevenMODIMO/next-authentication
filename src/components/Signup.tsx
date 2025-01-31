"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("image", image);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();

    if (json.message) {
      setError(json.message);
      setLoading(false);
      setEmail("");
      setPassword("");
      setImage(null);
      setPreview(null);
    } else {
      setError(null);
      setEmail("");
      setPassword("");
      setImage(null);
      setPreview(null);
      setLoading(false);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
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
        <label htmlFor="image">
          <p>Upload image</p>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}
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
          {loading ? "Loading ..." : "Create account"}
        </button>
        {error && (
          <div className="p-2 rounded text-white bg-red-400 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
