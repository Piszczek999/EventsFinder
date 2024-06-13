import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full bg-inherit items-center justify-between text-white px-4 p-2 shadow">
      <Link href={"/"} className="tile px-2 p-1">
        <div className="text-2xl font-medium">EventFinder</div>
      </Link>
      <AuthButton />
    </nav>
  );
}
