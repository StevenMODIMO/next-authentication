"use client";

export default function Footer() {
  return (
    <div className="text-center text-gray-500 font-semibold text-xm mt-32 absolute bottom-0 left-[10%] p-6 sm:left-[30%] lg:left-[40%]">
      &copy; Copyright {new Date().getFullYear()} Next-Auth.js
    </div>
  );
}
