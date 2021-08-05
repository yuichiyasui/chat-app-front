import { createStore } from "vuex";

import user, { UserState } from "./user";

type RootState = {
  user: UserState;
};

const store = createStore<RootState>({
  modules: {
    user,
  },
});

export default store;
