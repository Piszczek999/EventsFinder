"use client";

import { createClient } from "@/utils/supabase/client";
import { ComponentProps, MouseEvent, useState } from "react";

type Props = ComponentProps<"button"> & {
  initialState: boolean;
  eventId: string;
};

export default function EnterButton({
  initialState,
  eventId,
  ...props
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEntered, setIsEntered] = useState(initialState);
  const supabase = createClient();

  const handleEventSignUp = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("Enters")
        .insert({ user_id: user.id, event_id: eventId });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        setIsEntered(true);
      }
    }
  };

  const handleEventSignOut = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("Enters")
        .delete()
        .eq("user_id", user.id)
        .eq("event_id", eventId);

      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        setIsEntered(false);
      }
    }
  };

  return isEntered ? (
    <button
      {...props}
      className={`text-[#333] px-2 w-[120px] rounded-[10px] ${
        isHovered ? "bg-red-500" : "bg-[#80d184]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEventSignOut}
    >
      <p className="text-lg font-medium">
        {isHovered ? "Wypisz się" : "Zapisano"}
      </p>
    </button>
  ) : (
    <button
      {...props}
      className={`text-white px-2 w-[120px] rounded-[10px] ${
        isHovered ? "bg-gradient" : "bg-gradient saturate-50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEventSignUp}
    >
      <p className="text-lg font-medium">Zapisz się</p>
    </button>
  );
}
