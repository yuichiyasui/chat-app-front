import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { store } from "@/store";
import { USER_ACTION } from "@/store/action-types";

import Top from "@/pages/top/index.vue";
import Rooms from "@/pages/rooms/index.vue";
import Room from "@/pages/room/index.vue";
import UserRegistration from "@/pages/user-registration/index.vue";
import NotFound from "@/pages/not-found/index.vue";

const history = createWebHistory();

const checkRegisteredUser = async (): Promise<boolean> => {
  const userId = localStorage.getItem("USER_ID");
  if (!userId) return false;
  if (store.getters["user/isUserExist"]) return true;
  await store.dispatch(`user/${USER_ACTION.FETCH}`, userId);
  if (store.getters["user/isUserExist"]) return true;

  return false;
};

const routes: RouteRecordRaw[] = [
  { path: "/rooms", name: "rooms", component: Rooms },
  {
    path: "/room/:roomId",
    name: "room",
    component: Room,
    beforeEnter: async () => {
      const isRegistered = await checkRegisteredUser();
      return isRegistered || { name: "user-registration" };
    },
  },
  {
    path: "/user-registration",
    name: "user-registration",
    component: UserRegistration,
    beforeEnter: async () => {
      const isRegistered = await checkRegisteredUser();
      return !isRegistered;
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
