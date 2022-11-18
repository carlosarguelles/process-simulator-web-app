import type { Catalog } from "@/types";
import { defineStore } from "pinia";

export const useCatalogsStore = defineStore("catalogs", {
  state: () => {
    return { catalogs: [] as Catalog[] };
  },
  actions: {
    find(key: string) {
      return this.catalogs.find((c) => c.name === key);
    },
    add(catalog: Catalog) {
      if (this.find(catalog.name)) {
        return;
      }
      this.catalogs.push(catalog);
    },
    remove(key: string) {
      let catalog = this.find(key);
      if (!catalog) {
        return;
      }
      this.catalogs = this.catalogs.filter((c) => c.name != key);
    },
  },
});
