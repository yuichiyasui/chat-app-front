<template>
  <h1 class="">{{ "チャットルーム:" + state.room.id }}</h1>
  <ol>
    <li v-for="(post, index) in state.posts" :key="`post-${index}`">
      <p>
        {{ "ユーザー名:" + post.userId }}
      </p>
      <p>{{ post.message }}</p>
    </li>
  </ol>
  <form @submit="submit($event, state.form)">
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
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";

type Post = {
  id: number;
  roomId: number;
  userId: number;
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
};

const MOCK_DATA: Post[] = [
  {
    id: 1,
    roomId: 1,
    userId: 1,
    message: "テストテキスト",
    createdAt: "2021-07-17 00:00:00", // TODO: Rubyのtimestamp型にしたい
  },
  {
    id: 1,
    roomId: 1,
    userId: 1,
    message: "テストテキスト",
    createdAt: "2021-07-17 00:00:01", // TODO: Rubyのtimestamp型にしたい
  },
];

const submit = (event: any, form: MessageForm) => {
  event.preventDefault();
  console.log("投稿に成功しました。");
  form.message = "";
};

export default defineComponent({
  name: "Room",
  setup() {
    const route = useRoute();

    const state = reactive<State>({
      room: { id: route.params.roomId },
      posts: [],
      form: { message: "" },
    });

    // TODO: コネクションのsubscribeの処理を入れる

    // TODO: ルーム情報, 投稿一覧のデータフェッチの処理を入れる
    state.posts = MOCK_DATA;

    // onBeforeUnmount(()=> {
    //     // TODO: コネクションのunsubscribeの処理を入れる
    // })

    return { state, submit };
  },
});
</script>
