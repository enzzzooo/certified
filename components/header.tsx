import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";
export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold text-2xl">
          <Link
            href={"/"}
            className="bg-[linear-gradient(90deg,#ef4444,#facc15,#3b82f6,#ec4899)] bg-clip-text text-transparent"
          >
            Certified
          </Link>
        </div>
        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
    </nav>
  );
}
