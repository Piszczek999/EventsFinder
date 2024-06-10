import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { SubmitButton } from "@/components/SubmitButton";
import { error } from "console";

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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-xl justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground bg-[#F2F1EB] p-2 shadow-lg">
        <BackButton />
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center bg-red-700 text-white">
            {searchParams.message}
          </p>
        )}
        <label className="text-md" htmlFor="title">
          Tytuł
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="title"
          placeholder="Przykładowy tytuł"
          required
        />
        <label className="text-md" htmlFor="image">
          Zdjęcie (plik .jpg, max 50 MB)
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="file"
          name="image"
          accept="image/jpeg"
          required
        />
        <label className="text-md" htmlFor="description">
          Opis
        </label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="description"
          placeholder="Opis wydarzenia"
          required
        />
        <label className="text-md" htmlFor="location">
          Kraj
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="country"
          placeholder="Polska"
          required
        />
        <label className="text-md" htmlFor="location">
          Miasto
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="city"
          placeholder="Bydgoszcz"
          required
        />
        <label className="text-md" htmlFor="date">
          Data rozpoczęcia
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="datetime-local"
          name="date"
          min={new Date().toISOString().slice(0, -8)}
          required
        />
        <SubmitButton
          formAction={addEvent}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 text-white"
          pendingText="Zapisywanie..."
        >
          Zapisz
        </SubmitButton>
      </form>
    </div>
  );
}
