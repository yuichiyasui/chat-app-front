import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

import user, { UserState } from "./user";

export type RootState = {
  user: UserState;
};

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    user,
  },
});
