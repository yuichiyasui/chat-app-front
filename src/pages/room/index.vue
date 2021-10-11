<template>
  <h1 class="">{{ "チャットルーム:" + state.room.id }}</h1>
  <ol>
    <li v-for="(post, index) in state.posts" :key="`post-${index}`">
      <div v-if="post.type === 'notification'">
        <p>
          {{ post.createdAt }}
        </p>
        <p>{{ post.message }}</p>
      </div>
      <div v-else-if="post.type === 'message'">
        <p>
          {{ post.createdAt }}
        </p>
        <p>
          {{ post.name }}
        </p>
        <p>
          {{ post.message }}
        </p>
      </div>
    </li>
  </ol>
  <form @submit="submit($event, state.form, state.channel)">
    <textarea
      v-model="state.form.message"
      placeholder="メッセージを入力"
      name="message"
      cols="30"
      rows="10"
    ></textarea>
    <button type="submit">送信</button>
  </form>
  <router-link :to="{ name: 'rooms' }">ルーム一覧</router-link>
</template>

<script lang="ts">
import { api } from "@/api";
import { defineComponent, onBeforeMount, onBeforeUnmount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";

import ActionCable from "@/lib/actioncable";

type Post = {
  type: "notification" | "message";
  name?: string;
  userId?: number;
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

    return { state, submit };
  },
});
</script>
