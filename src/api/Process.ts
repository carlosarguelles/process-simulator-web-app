import { api } from ".";
import type { Process } from "@/types/Process";

export const ProcessApi = {
  all(params?: { limit: number }) {
    return api.get<Process[]>("/process/all", { params });
  },
};
