import { createRouter, createWebHashHistory } from "vue-router";

import Top from "../components/top/index.vue";

const history = createWebHashHistory();

const routes = [{ path: "/", component: Top }];

const router = createRouter({
	history,
	routes,
});

export default router;
