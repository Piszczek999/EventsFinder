import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { SubmitButton } from "@/components/SubmitButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const addEvent = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return redirect("/new-event?message=You have to be logged in");

    const { error } = await supabase.storage
      .from("event-photo")
      .upload("public/" + image.name, image);

    if (error) {
      console.log(error);
      return redirect("/new-event?message=Could not create an event");
    }

    const { error: err } = await supabase.from("Event").insert({
      title,
      description,
      location,
      date,
      image_url: `https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/${image.name}`,
      added_by: user.id,
    });

    if (err) {
      console.log(err);
      return redirect("/new-event?message=Could not create an event");
    }

    return redirect("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-xl justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground bg-[#F2F1EB] p-2 shadow-lg">
        <BackButton />
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
          Image
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="file"
          name="image"
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
          required
        />
        <SubmitButton
          formAction={addEvent}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending..."
        >
          Submit
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
