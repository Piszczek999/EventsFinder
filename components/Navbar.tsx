import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-[#1A4D2E] text-white p-2 shadow-lg">
      <div>
        <Link href={"/"} className="font-medium">
          EventsFinder
        </Link>
      </div>
      <AuthButton />
    </nav>
  );
}
