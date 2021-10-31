import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { store } from "@/store";
import { USER_ACTION } from "@/store/action-types";

import Top from "@/pages/top/index.vue";
import Rooms from "@/pages/rooms/index.vue";
import Room from "@/pages/room/index.vue";
import UserRegistration from "@/pages/user-registration/index.vue";
import NotFound from "@/pages/not-found/index.vue";

const history = createWebHistory();

const routes: RouteRecordRaw[] = [
  { path: "/rooms", name: "rooms", component: Rooms },
  {
    path: "/room/:roomId",
    name: "room",
    component: Room,
  },
  {
    path: "/user-registration",
    name: "user-registration",
    component: UserRegistration,
    beforeEnter: async () => {
      const userId = localStorage.getItem("USER_ID");
      if (!userId) return true;
      if (store.getters["user/isUserExist"]) return false;
      await store.dispatch(`user/${USER_ACTION.FETCH}`, userId);
      if (store.getters["user/isUserExist"]) return false;

      return true;
    },
  },
  { path: "/", name: "top", component: Top },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history,
  routes,
});

export default router;
