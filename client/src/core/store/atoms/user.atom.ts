import { User } from "@/core/lib/types/global.types";
import { atom } from "recoil";

export const UserAtom = atom({
  key: "user/default/key.atom",
  default: null as User | null,
});
