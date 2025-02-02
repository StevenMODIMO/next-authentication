"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiImageCircleAiLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
        className="flex flex-col gap-4 sm:w-96 sm:mx-auto"
      >
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 mx-auto rounded-full border-4 border-orange-400 p-2"
          />
        )}
        <label
          htmlFor="image"
          className="flex gap-2 items-center text-gray-500 border-2 border-orange-400 p-2 rounded-2xl"
        >
          <RiImageCircleAiLine />
          <p>Avatar: (optional)</p>
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <label
          htmlFor="email"
          className="text-gray-500 flex gap-2 items-center"
        >
          <MdOutlineAlternateEmail />
          <p>Email</p>
        </label>
        <input
          className="border-2 border-orange-400 p-2 rounded-2xl font-semibold text-gray-500 outline-none"
          id="email"
          type="text"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="password"
          className="text-gray-500 flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <TbLockPassword />
            <p>Password</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
          </div>
        </label>
        <input
          className="border-2 border-orange-400 p-2 rounded-2xl font-semibold text-gray-500 outline-none"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-fit mx-auto text-white bg-orange-400 p-2 rounded-2xl">
          {loading ? "Loading ..." : "Create account"}
        </button>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={
                error
                  ? "mx-auto w-fit p-3 rounded-xl bg-red-400 text-white"
                  : ""
              }
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
