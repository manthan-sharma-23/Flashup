import { Flashcard } from "@/core/lib/types/global.types";
import { atom } from "recoil";

export const DASHBOARD_FLASHCARDS = atom({
  key: "dash/flash/key/card",
  default: [] as Flashcard[],
});
