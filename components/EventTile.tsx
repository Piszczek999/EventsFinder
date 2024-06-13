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
    Math.ceil(
      Math.ceil(new Date(event.date).getTime() / (1000 * 3600 * 24)) -
        Math.ceil(new Date().getTime() / (1000 * 3600 * 24))
    )
  );

  return (
    <button
      onClick={handleClick}
      className="h-[200px] animate-in shadow relative overflow-hidden rounded-[10px]"
    >
      <div style={tileStyle} className="absolute inset-0" />
      <div
        className={`absolute right-1 top-1 ${
          daysFromNow >= 0 ? "bg-black" : "bg-red-600"
        } bg-opacity-80 p-1 rounded-full text-white`}
      >
        {daysFromNow > 1
          ? "za " + daysFromNow + " dni"
          : daysFromNow === 1
          ? "jutro"
          : daysFromNow === 0
          ? "dzisiaj"
          : daysFromNow === -1
          ? "wczoraj"
          : -daysFromNow + " dni temu"}
      </div>
      <div className="bg-black bg-opacity-60 top-[75%] absolute inset-0 text-white">
        <p className="text-center">{event.title}</p>
      </div>
    </button>
  );
}
