import EventsList from "@/components/EventsList";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 w-full sm:max-w-3xl px-3">
        <EventsList />
      </div>
    </div>
  );
}
