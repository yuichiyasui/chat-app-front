import { createRouter, createWebHistory } from "vue-router";

import Top from "@/components/top/index.vue";
import Rooms from "@/components/rooms/index.vue";
import Room from "@/components/room/index.vue";

const history = createWebHistory();

const routes = [
  { path: "/rooms", name: "rooms", component: Rooms },
  { path: "/room/:roomId", name: "room", component: Room },
  { path: "/", name: "top", component: Top },
];

const router = createRouter({
  history,
  routes,
});

export default router;
