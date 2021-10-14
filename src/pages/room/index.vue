<template>
  <main>
    <div class="bg-white mx-auto mt-20 py-16 px-20 w-6/12 rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-center mb-5">
        {{ "チャットルーム:" + state.room.id }}
      </h1>
      <ol class="mb-10">
        <li
          v-for="(post, index) in displayPosts"
          :key="`post-${index}`"
          class="mb-4 last:mb-0"
        >
          <div
            v-if="post.type === 'notification'"
            class="max-w-sm rounded-lg bg-gray-200 text-center mx-auto p-2"
          >
            <p>
              {{ post.createdAt }}
            </p>
            <p>{{ post.message }}</p>
          </div>
          <div v-else-if="post.type === 'message'">
            <p
              class="text-sm text-gray-500 font-semibold mb-2"
              :class="{ 'text-right': post.isSelf }"
            >
              {{ post.name }}
            </p>
            <p
              class="table rounded-lg max-w-full shadow p-2 mb-2"
              :class="{ 'ml-auto': post.isSelf }"
            >
              {{ post.message }}
            </p>
            <p
              class="text-sm text-gray-500"
              :class="{ 'text-right': post.isSelf }"
            >
              {{ post.createdAt }}
            </p>
          </div>
        </li>
      </ol>
      <form @submit="submit($event, state.form, state.channel)" class="mb-10">
        <textarea
          v-model="state.form.message"
          placeholder="メッセージを入力"
          name="message"
          cols="30"
          rows="10"
          required
          class="
            mb-4
            input
            ring-2 ring-gray-300
            rounded
            w-full
            py-2
            px-4
            focus:outline-none focus:ring-2 focus:ring-blue-600
          "
        ></textarea>
        <Button type="submit" class="mx-auto">送信</Button>
      </form>
      <Button :to="{ name: 'rooms' }" color="bg-green-500" class="mx-auto">
        ルーム一覧
      </Button>
    </div>
  </main>
</template>

<script lang="ts">
import { api } from "@/api";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";

import ActionCable from "@/lib/actioncable";

import Button from "@/components/button/index.vue";

type Post = {
  type: "notification" | "message";
  name?: string;
  userId?: number;
  isSelf?: boolean;
  message: string;
  createdAt: string;
};

type MessageForm = {
  message: string;
};

type State = {
  room: any;
  posts: Post[];
  form: MessageForm;
  channel: any;
};

const checkValidUser = async () => {
  const router = useRouter();
  const store = useStore(key);

  const userId = localStorage.getItem("USER_ID");
  if (!userId) return router.push({ name: "user-registration" });
  if (store.getters.isUserExist) return Promise.resolve();
  const user = await api.fetchUser(userId);
  user
    ? store.commit({ type: "set", user })
    : router.push({ name: "user-registration" });
};

const submit = async (event: any, form: MessageForm, channel: any) => {
  event.preventDefault();
  channel.perform("submit", form);
  form.message = "";
};

export default defineComponent({
  name: "Room",
  components: {
    Button,
  },
  setup(_) {
    const route = useRoute();
    const store = useStore(key);
    const state = reactive<State>({
      room: { id: route.params.roomId },
      posts: [],
      form: { message: "" },
      channel: null,
    });

    onBeforeMount(async () => {
      await checkValidUser();

      const endpoint = "ws:localhost:3500/cable";
      const cable = ActionCable.createConsumer(endpoint);
      state.channel = cable.subscriptions.create(
        {
          channel: "RoomChannel",
          id: route.params.roomId,
          uuid: store.state.user.user?.uuid,
        },
        {
          connected() {
            console.log("connected.");
          },
          received(data: Post) {
            state.posts.push(data);
          },
          disconnected() {
            console.log("disconnected.");
          },
        }
      );
    });

    onBeforeUnmount(() => {
      state.channel.unsubscribe();
    });

    const displayPosts = computed(() => {
      return state.posts.map((post) => {
        if (post.type === "message") {
          post.isSelf = post.userId === store.state.user.user?.id;
        }
        return post;
      });
    });

    return { state, displayPosts, submit };
  },
});
</script>
