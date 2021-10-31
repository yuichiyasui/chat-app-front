import { ActionContext, Module } from "vuex";

import { api } from "@/api";
import { RootState } from "@/store";

import { User } from "@/types";
import { USER_ACTION } from "./action-types";
import { USER_MUTATION } from "./mutation-types";

export type UserState = {
  user: User | null;
};

const user: Module<UserState, RootState> = {
  namespaced: true,
  state(): UserState {
    return { user: null };
  },
  mutations: {
    set(state: UserState, payload: { user: User }) {
      state.user = payload.user;
    },
  },
  actions: {
    async [USER_ACTION.FETCH](
      { commit }: ActionContext<UserState, RootState>,
      userId: string
    ) {
      const user = await api.fetchUser(userId);
      if (user) commit({ type: USER_MUTATION.SET, user });
    },
    async [USER_ACTION.REGISTER](
      { commit }: ActionContext<UserState, RootState>,
      name: string
    ) {
      const user = await api.registerUser(name);
      if (user) commit({ type: USER_MUTATION.SET, user });
    },
  },
  getters: {
    isUserExist(state: UserState) {
      return Boolean(state.user);
    },
  },
};

export default user;
