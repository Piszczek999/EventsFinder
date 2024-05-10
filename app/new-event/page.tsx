import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { SubmitButton } from "@/components/SubmitButton";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const addEvent = async (formData: FormData) => {
    "use server";
    const errors: string[] = [];

    try {
      const title = formData.get("title") as string;
      const image = formData.get("image") as File;
      const description = formData.get("description") as string;
      const location = formData.get("location") as string;
      const date = formData.get("date") as string;

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You have to be logged in");

      const randomId = Math.random().toString(36).substring(2);
      let extension = "";
      const filenameParts = image.name.split(".");
      if (filenameParts.length > 1) {
        extension = filenameParts[filenameParts.length - 1].toLowerCase();
      }
      if (!["jpg", "jpeg"].includes(extension)) {
        throw new Error("Wrong file format. Please upload a JPG file.");
      }

      const { error: uploadError } = await supabase.storage
        .from("event-photo")
        .upload(`public/${randomId}.${extension}`, image);

      if (uploadError) {
        throw new Error("Failed to upload image. Please try again.");
      }

      const { error: insertError } = await supabase.from("Event").insert({
        title,
        description,
        location,
        date,
        image_url: `https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/${randomId}.${extension}`,
        added_by: user.id,
      });

      if (insertError) {
        throw new Error("Failed to create event. Please try again.");
      }

      // Redirect or navigate to the desired page
      redirect("/");
    } catch (error) {
      console.error(error);
      return redirect("/new-event?message=Something went wrong");
    }
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
          Title
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="title"
          placeholder="example title"
          required
        />
        <label className="text-md" htmlFor="image">
          Image (.jpg file)
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="file"
          name="image"
          accept="image/jpeg"
          required
        />
        <label className="text-md" htmlFor="description">
          Description
        </label>
        <textarea
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="description"
          placeholder="event description"
          required
        />
        <label className="text-md" htmlFor="location">
          Location
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="location"
          placeholder="Mennica 10, 85-112 Bydgoszcz"
          required
        />
        <label className="text-md" htmlFor="date">
          Date
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
          pendingText="Sending..."
        >
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}
