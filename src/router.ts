import { createRouter, createWebHistory } from "vue-router";
import { MainView, CatalogView } from "./views";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainView,
    },
    {
      path: "/catalogos",
      component: CatalogView,
    },
  ],
});
