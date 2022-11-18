import type { Process } from "./Process";

export interface Catalog {
  name: string;
  processes: Process[];
}
