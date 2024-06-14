import { createClient } from "@/utils/supabase/server";
import EventSigningButton from "./EventSigningButton";

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

  return (
    <div className="flex flex-col w-full sm:max-w-4xl mt-4 gap-4 mx-auto">
      <div className="animate-in tile p-4 shadow bg-gray-800 rounded">
        <h1 className="text-white text-4xl font-bold p-2 text-center">
          {event.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="animate-in shadow rounded-[10px] h-full">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="animate-in p-4 shadow rounded-[10px] bg-white text-[#333] flex flex-col justify-between grow">
            <div className="text-lg">
              <strong>Tytuł:</strong>
              <p>{event.title}</p>
            </div>
            <div className="text-lg">
              <strong>Data:</strong>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="text-lg">
              <strong>Godzina:</strong>
              <p>{new Date(event.date).toLocaleTimeString().slice(0, -3)}</p>
            </div>
            <div className="text-lg">
              <strong>Miejsce:</strong>
              <p>
                {event.city}, {event.country || "N/A"}
              </p>
            </div>
          </div>
          <EventSigningButton
            eventId={event.id}
            className="p-2 rounded-[10px] font-medium text-xl shadow hover:opacity-90"
          />
        </div>
      </div>

      <div className="animate-in p-4 shadow rounded-[10px] bg-white text-[#333] flex flex-col justify-between">
        <p className="text-lg">
          <strong>Opis:</strong>
          <p className="">{event.description}</p>
        </p>
      </div>

      <div className="animate-in p-4 shadow bg-[#333] rounded text-white">
        <h2 className="text-2xl font-bold">Szczegóły</h2>
        <p className="text-sm">
          <strong>Utworzono:</strong>{" "}
          {new Date(event.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
