import { Topic } from "@/core/lib/types/global.types";
import { atom } from "recoil";

export const DASHBOARD_TOPICS = atom({
  key: "topics/dashboards/list/key",
  default: [] as Topic[],
});
