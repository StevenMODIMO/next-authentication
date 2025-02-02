import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account deleted",
};

type Params = Promise<{ msg?: boolean }>;

export default async function DeletePage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const msg = (await searchParams).msg;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {msg && (
        <div className="flex items-center justify-center border bg-gray-300 p-4 rounded font-semibold text-xl">
          <p>Your account has been deleted</p>
        </div>
      )}
    </div>
  );
}
