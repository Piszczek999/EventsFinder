import BackButton from "@/components/BackButton";
import SearchInput from "@/components/SearchInput";
import { SubmitButton } from "@/components/SubmitButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  // Adding new event
  const addEvent = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const country = formData.get("country") as string;
    const city = formData.get("city") as string;
    const date = formData.get("date") as string;

    // Check if user is logged in
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return redirect("/login");

    // Generate random filename
    const randomId = Math.random().toString(36).substring(2);
    const extension = image.name.split(".").pop()?.toLowerCase();
    if (extension && !["jpg", "jpeg"].includes(extension)) {
      return redirect(
        "/new-event?message=Wrong file format. Please upload a JPG file."
      );
    }

    // Upload image to storage
    const { error: uploadError } = await supabase.storage
      .from("event-photo")
      .upload(`public/${randomId}.${extension}`, image);

    if (uploadError) {
      return redirect(
        "/new-event?message=Failed to upload image. Please try again."
      );
    }

    // Insert event to database
    const { error: insertError } = await supabase.from("Event").insert({
      title,
      description,
      country,
      city,
      date,
      image_url: `https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/${randomId}.${extension}`,
      added_by: user.id,
    });

    if (insertError) {
      return redirect("/new-event?message=" + insertError.message);
    }

    // Everything is ok
    return redirect("/");
  };

  return (
    <div className="flex flex-col w-full sm:max-w-xl gap-2 mt-4">
      <div className="animate-in tile p-2 shadow">
        <h1 className="text-white text-4xl font-bold p-2 text-center">
          Tworzenie Wydarzenia
        </h1>
      </div>

      <form className="animate-in animate-delay-500 flex flex-col w-full gap-8 bg-white text-[#333] p-4 rounded-[10px] shadow">
        <BackButton />
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center bg-red-700 text-white">
            {searchParams.message}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="title">
            Tytuł
          </label>
          <SearchInput
            className="rounded-md px-4 py-2 shadow"
            name="title"
            id="title"
            placeholder="Przykładowy tytuł"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="image">
            Zdjęcie (plik .jpg, max 50 MB)
          </label>
          <input
            className="rounded-md px-4 py-2 shadow"
            type="file"
            name="image"
            id="image"
            accept="image/jpeg"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="description">
            Opis
          </label>
          <textarea
            className="rounded-md px-4 py-2 shadow"
            name="description"
            id="description"
            placeholder="Opis wydarzenia"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="country">
            Kraj
          </label>
          <SearchInput
            className="rounded-md px-4 py-2 shadow"
            name="country"
            id="country"
            placeholder="Polska"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="city">
            Miasto
          </label>
          <SearchInput
            className="rounded-md px-4 py-2 shadow"
            name="city"
            id="city"
            placeholder="Bydgoszcz"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="date">
            Data rozpoczęcia
          </label>
          <input
            className="rounded-md px-4 py-2 shadow"
            type="datetime-local"
            name="date"
            id="date"
            min={new Date().toISOString().slice(0, -8)}
            required
          />
        </div>
        <SubmitButton
          formAction={addEvent}
          className="tile px-4 py-2 text-white font-medium hover:opacity-90"
          pendingText="Zapisywanie..."
        >
          Zapisz
        </SubmitButton>
      </form>
    </div>
  );
}
