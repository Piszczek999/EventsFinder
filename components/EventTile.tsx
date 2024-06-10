import { Event } from "@/types";
import { useRouter } from "next/navigation";

export default function EventTile({ event }: { event: Event }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${event.id}`);
  };

  const tileStyle = {
    backgroundImage: `url(${event.image_url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const daysFromNow = Math.ceil(
    (new Date(event.date).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <button
      onClick={handleClick}
      className="border-[#E8DFCA] border-b-2 h-[200px] opacity-0 animate-in bg-[#F5EFE6] shadow-lg relative overflow-hidden"
    >
      <div style={tileStyle} className="absolute inset-0" />
      <div className="absolute right-0 top-0 bg-[#1A4D2E] bg-opacity-70 p-1 rounded-full text-white">
        {"za " + daysFromNow + " dni"}
      </div>
      <div className="bg-[#1A4D2E] bg-opacity-70 top-[75%] absolute inset-0 text-white">
        <p className="text-center">{event.title}</p>
      </div>
    </button>
  );
}
