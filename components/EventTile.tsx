import { Event } from "@/types";

export default function EventTile({ event }: { event: Event }) {
  const tileStyle = {
    backgroundImage: `url(${event.image_url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="border-[#E8DFCA] border-b-2 h-[200px] opacity-0 animate-in bg-[#F5EFE6] shadow-lg relative overflow-hidden">
      <div style={tileStyle} className="absolute inset-0" />
      <div className="bg-black bg-opacity-60 top-[75%] absolute inset-0 text-white">
        <p className="text-center">{event.title}</p>
      </div>
    </div>
  );
}
