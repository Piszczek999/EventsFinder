import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full bg-inherit items-center justify-between text-white px-4 p-2 shadow">
      <div className="flex items-center gap-8">
        <Link href={"/"} className="tile px-2 p-1">
          <div className="text-2xl font-medium">EventFinder</div>
        </Link>
        <Link href={"/events"} className="px-2 p-1">
          <div className="text-xl font-medium text-[#333]">Wyszukiwarka</div>
        </Link>
      </div>
      <AuthButton />
    </nav>
  );
}
