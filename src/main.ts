import { createApp } from "vue";
import router from "@/router/index";
import { store, key } from "@/store/index";

import "./assets/css/index.css";

import App from "@/App.vue";

const app = createApp(App);
app.use(router);
app.use(store, key);
app.mount("#app");
