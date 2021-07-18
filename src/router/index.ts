import { createRouter, createWebHistory } from "vue-router";

import Top from "@/components/top/index.vue";
import Rooms from "@/components/rooms/index.vue";
import Room from "@/components/room/index.vue";
import UserRegistration from "@/components/user-registration/index.vue";

const history = createWebHistory();

const routes = [
  { path: "/rooms", name: "rooms", component: Rooms },
  { path: "/room/:roomId", name: "room", component: Room },
  {
    path: "/user-registration",
    name: "user-registration",
    component: UserRegistration,
  },
  { path: "/", name: "top", component: Top },
];

const router = createRouter({
  history,
  routes,
});

export default router;
