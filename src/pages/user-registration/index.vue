<script lang="ts">
import { defineComponent, reactive } from "vue";

import Button from "@/components/button/index.vue";
import { useRouter } from "vue-router";
import { key } from "@/store";
import { useStore } from "vuex";
import { USER_ACTION } from "@/store/action-types";

type State = {
  form: UserForm;
  isSubmiting: boolean;
  hasError: boolean;
};

type UserForm = {
  name: string;
};

// localstorageにユーザーIDがない場合だけこのページに遷移できる
export default defineComponent({
  name: "UserRegistration",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const store = useStore(key);
    const state = reactive<State>({
      form: { name: "" },
      isSubmiting: false,
      hasError: false,
    });

    const submit = async (event: Event, state: State) => {
      event.preventDefault();
      state.isSubmiting = true;
      await store.dispatch(`user/${USER_ACTION.REGISTER}`, state.form.name);
      const user = store.state.user.user;
      if (user) {
        localStorage.setItem("USER_ID", user.uuid);
        state.form.name = "";
      } else {
        state.hasError = true;
      }
      state.isSubmiting = false;
      router.back();
    };

    return { state, submit };
  },
});
</script>

<template>
  <div class="bg-white mx-auto mt-20 py-16 px-20 w-max rounded-lg shadow-sm">
    <h1 class="text-2xl font-bold text-center mb-5">ユーザー登録</h1>
    <form class="mb-5" @submit="submit($event, state)">
      <label class="table mx-auto mb-4">
        <p class="text-lg text-center mb-3">ユーザー名</p>
        <div>
          <input
            v-model="state.form.name"
            type="text"
            name="name"
            :maxlength="8"
            required
            class="
              input
              border-2 border-gray-300
              rounded
              w-full
              block
              focus:outline-none focus:border-2 focus:border-blue-600
              mb-4
              py-2
              px-4
              text-center
            "
          />
        </div>
        <small class="block text-center">
          ※ ユーザー名は8文字以内で登録可能です。
        </small>
      </label>
      <Button type="submit" :disabled="state.isSubmiting" class="mx-auto">
        登録
      </Button>
    </form>
    <p v-if="state.hasError" class="text-red-500 text-center mb-5">
      何らかのエラーが発生しました。
      <br />
      リロードして再度登録を行うか、時間を置いて再度お試しください。
    </p>
    <Button :to="{ name: 'rooms' }" color="bg-green-500" class="mx-auto">
      ルーム一覧
    </Button>
  </div>
</template>
