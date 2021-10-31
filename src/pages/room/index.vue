<script lang="ts">
import { api } from "@/api";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  ref,
  nextTick,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";

import { Room } from "@/types";

import ActionCable from "@/lib/actioncable";
import dayjs from "@/lib/dayjs";

import Button from "@/components/button/index.vue";
import { USER_MUTATION } from "@/store/mutation-types";

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
  room: Room | null;
  posts: Post[];
  form: MessageForm;
  channel: ActionCable.Channel | null;
};

const checkValidUser = async () => {
  const store = useStore(key);

  const userId = localStorage.getItem("USER_ID");
  if (!userId) return false;
  if (store.getters["user/isUserExist"]) return true;
  const user = await api.fetchUser(userId);
  if (user) {
    store.commit({ type: `user/${USER_MUTATION.SET}`, user });
    return true;
  }
  return false;
};

export default defineComponent({
  name: "Room",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore(key);
    const state = reactive<State>({
      room: null,
      posts: [],
      form: { message: "" },
      channel: null,
    });

    const inputMessageRef = ref<HTMLTextAreaElement>();
    const messageListRef = ref<HTMLOListElement>();

    watch(
      () => state.form.message,
      () => {
        if (inputMessageRef?.value) {
          inputMessageRef.value.style.height = "auto";
          inputMessageRef.value.style.height =
            inputMessageRef.value.scrollHeight + "px";
        }
      }
    );

    onBeforeMount(async () => {
      const roomId = route.params.roomId;
      const isValidUser = await checkValidUser();
      if (!isValidUser) {
        return router.push({ name: "user-registration" });
      }
      state.room = await api.fetchRoom(Number(roomId));

      const endpoint = "ws:localhost:3500/cable";
      const cable = ActionCable.createConsumer(endpoint);
      state.channel = cable.subscriptions.create(
        {
          channel: "RoomChannel",
          id: route.params.roomId,
          uuid: store.state.user.user?.uuid,
        },
        {
          received(data: Post) {
            state.posts.push(data);

            nextTick(() => {
              if (messageListRef?.value) {
                messageListRef.value.scrollTop =
                  messageListRef.value.scrollHeight;
              }
            });
          },
        }
      );
    });

    onBeforeUnmount(() => {
      state.channel?.unsubscribe();
    });

    const displayPosts = computed(() => {
      return state.posts.map((post) => {
        post.createdAt = dayjs(post.createdAt).format("YYYY-MM-DD hh:mm:ss");
        if (post.type === "message") {
          post.isSelf = post.userId === store.state.user.user?.id;
        }
        return post;
      });
    });

    const submit = async (
      event: Event,
      form: MessageForm,
      channel: ActionCable.Channel | null
    ) => {
      event.preventDefault();
      channel?.perform("submit", form);
      form.message = "";
    };

    return { state, displayPosts, inputMessageRef, messageListRef, submit };
  },
});
</script>

<template>
  <main>
    <div class="bg-white mx-auto mt-20 py-16 px-20 w-6/12 rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-center mb-5">
        {{ state.room?.name || "チャットルーム名" }}
      </h1>
      <ol
        ref="messageListRef"
        class="message-list overflow-y-scroll max-h-96 mb-5"
      >
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
              v-if="!post.isSelf"
              class="text-sm text-gray-500 font-semibold mb-2"
              :class="{ 'text-right': post.isSelf }"
            >
              {{ post.name }}
            </p>
            <p
              class="
                whitespace-pre-line
                table
                rounded-lg
                max-w-full
                shadow
                p-2
                mb-2
              "
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
      <form class="mb-10" @submit="submit($event, state.form, state.channel)">
        <textarea
          ref="inputMessageRef"
          v-model="state.form.message"
          placeholder="メッセージを入力"
          name="message"
          required
          class="
            mb-4
            input
            ring-2 ring-gray-300
            rounded
            w-full
            py-2
            px-4
            resize-none
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

<style lang="scss" scoped>
/* Chrome, Safari 対応 */
.message-list::-webkit-scrollbar {
  display: none;
}
</style>
