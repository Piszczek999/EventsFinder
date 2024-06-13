import { Event } from "@/types";
import { useRouter } from "next/navigation";
import EnterButton from "./EnterButton";

export default function EventTile({
  event,
  isEntered,
}: {
  event: Event;
  isEntered: boolean;
}) {
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
    <div
      onClick={handleClick}
      className="group h-[200px] animate-in shadow relative overflow-hidden rounded-[10px] cursor-pointer"
    >
      <div
        style={tileStyle}
        className="absolute inset-0 group-hover:opacity-80"
      />
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
      <div className="absolute left-1 top-1 z-10">
        <EnterButton initialState={isEntered} eventId={event.id} />
      </div>
      <div className="bg-black bg-opacity-60 top-[70%] absolute inset-0 text-white group-hover:opacity-80">
        <p className="text-center text-lg">{event.title}</p>
      </div>
    </div>
  );
}
