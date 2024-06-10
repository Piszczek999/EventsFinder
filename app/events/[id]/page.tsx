import { createClient } from "@/utils/supabase/server";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const supabase = createClient();
  const { data: event } = await supabase
    .from("Event")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  if (!event) return <div>Event Not Found</div>;

  return <div>{event?.title}</div>;
}
