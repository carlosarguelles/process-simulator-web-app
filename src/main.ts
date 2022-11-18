import { createPinia } from "pinia";
import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";
import App from "./App.vue";
import "./assets/main.css";
import { router } from "./router";

const app = createApp(App);

const pinia = createPinia();

app.use(VueQueryPlugin);
app.use(router);
app.use(pinia);

app.mount("#app");
