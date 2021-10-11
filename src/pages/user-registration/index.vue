<template>
  <h1>ユーザー登録</h1>
  <form @submit="submit($event, state)">
    <label>
      <p>ユーザー名</p>
      <div>
        <input
          type="text"
          name="name"
          v-model="state.form.name"
          maxlength="8"
          required
        />
      </div>
    </label>
    <small>※ ユーザー名は8文字以内で登録可能です。</small>
    <button type="submit" :disabled="state.isSubmiting" class="submit-button">
      登録
    </button>
  </form>
  <p v-if="state.hasError" class="error-message">
    何らかのエラーが発生しました。
    <br />
    リロードして再度登録を行うか、時間を置いて再度お試しください。
  </p>
  <router-link :to="{ name: 'rooms' }">ルーム一覧</router-link>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import { api } from "@/api/index";

type State = {
  form: UserForm;
  isSubmiting: boolean;
  hasError: boolean;
};

type UserForm = {
  name: string;
};

const submit = async (event: any, state: State) => {
  event.preventDefault();
  state.isSubmiting = true;
  const user = await api.registerUser(state.form.name);
  if (user) {
    localStorage.setItem("USER_ID", user.uuid);
    state.form.name = "";
  } else {
    state.hasError = true;
  }
  state.isSubmiting = false;
};

// localstorageにユーザーIDがない場合だけこのページに遷移できる
export default defineComponent({
  name: "UserRegistration",
  setup() {
    const state = reactive<State>({
      form: { name: "" },
      isSubmiting: false,
      hasError: false,
    });

    return { state, submit };
  },
});
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
}

.submit-button {
  display: table;
  margin: 0 auto;
}
</style>
