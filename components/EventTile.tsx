import { Event } from "@/types";

export default function EventTile({ event }: { event: Event }) {
  return (
    <div className="border-[#E8DFCA] border-b-2 h-[150px] opacity-0 animate-in bg-[#F5EFE6] shadow-lg">
      <p>{event.title}</p>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </div>
  );
}
