import { User } from "@/types";

export type UserState = {
  user: User | null;
};

const user = {
  state(): UserState {
    return { user: null };
  },
  mutations: {
    set(state: UserState, payload: any) {
      state.user = payload.user;
    },
  },
  actions: {
    fetch(context: any) {
      context.commit({ type: "set", user });
    },
    register(context: any) {
      context.commit({ type: "set", user });
    },
  },
  getters: {
    isUserExist(state: UserState) {
      return Boolean(state.user);
    },
  },
};

export default user;
