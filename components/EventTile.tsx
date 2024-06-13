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
      className="h-[200px] animate-in shadow relative overflow-hidden rounded-[10px]"
    >
      <div style={tileStyle} className="absolute inset-0" />
      <div className="absolute right-1 top-1 bg-black bg-opacity-60 p-1 rounded-full text-white">
        {"za " + daysFromNow + " dni"}
      </div>
      <div className="bg-black bg-opacity-60 top-[75%] absolute inset-0 text-white">
        <p className="text-center">{event.title}</p>
      </div>
    </button>
  );
}
