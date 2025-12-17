import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Groomsta</span>
        </h1>

        <p className="mt-3 text-2xl">
          Partner & Admin Portal
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full space-x-4">
          <Link href="/partner/register">
             <Button size="lg">Partner Registration</Button>
          </Link>
          <Link href="/admin/verifications/pending">
             <Button variant="outline" size="lg">Admin Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
