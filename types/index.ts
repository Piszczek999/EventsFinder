import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["Event"]["Row"];
