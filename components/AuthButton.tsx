import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4 text-black">
      Cześć, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline">Wyloguj</button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline text-[#333333]"
    >
      Zaloguj
    </Link>
  );
}
