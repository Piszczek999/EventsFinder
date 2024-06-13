import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/SubmitButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=" + error.message);
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=" + error.message);
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  const signInWithGithub = async () => {
    "use server";
    console.log("test");

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    console.log(data);

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <div className="animate-in flex-1 flex flex-col w-full bg-[#F2F1EB] shadow-lg p-8 sm:max-w-md justify-center gap-4">
      <BackButton />

      {/* Github */}
      <form className="flex flex-col items-center">
        <button
          formAction={signInWithGithub}
          className="border border-black rounded-md px-4 py-2 mb-2 flex items-center text-center bg-[#F2F1EB] font-semibold gap-2 hover:invert hover:scale-105 transition"
        >
          <Icon icon="github" />
          Sign in with Github
        </button>
      </form>

      {/* --lub-- */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black"></div>
        </div>
        <div className="relative px-3 bg-[#F2F1EB] text-gray-600">lub</div>
      </div>

      {/* errors */}
      {searchParams?.message && (
        <p className="animate-in mt-4 p-4 bg-red-600 text-white text-center">
          {searchParams.message}
        </p>
      )}

      {/* credentials */}
      <form className=" flex flex-col w-full justify-center gap-2">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Hasło
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 text-white hover:scale-105 transition"
          pendingText="Logowanie..."
        >
          Zaloguj
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className=" bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2 text-white hover:scale-105 transition"
          pendingText="Tworzenie..."
        >
          Utwórz konto
        </SubmitButton>
      </form>
    </div>
  );
}
