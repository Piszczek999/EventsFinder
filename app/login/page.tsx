import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/SubmitButton";
import SearchInput from "@/components/SearchInput";

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

    const origin = headers().get("origin");
    const supabase = createClient();

    console.log(`${origin}/auth/callback`);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <div className="flex flex-col w-full sm:max-w-xl mt-4 gap-4">
      <div className="animate-in tile p-2 shadow">
        <h1 className="text-white text-4xl font-bold p-2 text-center">
          Logowanie
        </h1>
      </div>

      <div className="animate-in animate-delay-500 flex flex-col w-full bg-white shadow p-8 justify-center gap-4 rounded-[10px]">
        <BackButton />

        {/* Github */}
        <form className="flex flex-col items-center">
          <button
            formAction={signInWithGithub}
            className="rounded-md px-4 py-2 mb-2 flex items-center text-center bg-white shadow font-semibold gap-2 invert"
          >
            <Icon icon="github" />
            Sign in with Github
          </button>
        </form>

        {/* --lub-- */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333]"></div>
          </div>
          <div className="relative px-3 bg-white text-gray-600">lub</div>
        </div>

        {/* errors */}
        {searchParams?.message && (
          <p className="animate-in mt-4 p-4 bg-red-600 text-white text-center">
            {searchParams.message}
          </p>
        )}

        {/* credentials */}
        <form className="flex flex-col w-full justify-center gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <SearchInput
            className="rounded-md px-4 py-2 shadow"
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Hasło
          </label>
          <SearchInput
            className="rounded-md px-4 py-2 shadow"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="tile px-4 py-2 mb-2 text-white mt-5 hover:opacity-90"
            pendingText="Logowanie..."
          >
            Zaloguj
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="tile-reverse px-4 py-2 mb-2 text-white hover:opacity-90"
            pendingText="Tworzenie..."
          >
            Utwórz konto
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
