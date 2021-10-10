<template>
  <div class="bg-white mx-auto mt-20 py-16 px-20 w-max rounded-lg shadow-sm">
    <!-- イラスト：Loose Drawing https://loosedrawing.com/illust/0309/ -->
    <img
      width="500"
      height="500"
      src="src/assets/img/chat.png"
      alt="チャットイメージ"
      class="mx-auto"
    />
    <p class="text-xl leading-loose text-center mb-10">
      Vue3 × Vite × Ruby on Rails製の
      <br />
      チャットアプリケーション
    </p>
    <router-link
      :to="{ name: 'rooms' }"
      class="
        table
        mx-auto
        bg-blue-500
        text-white
        font-bold
        rounded-md
        px-8
        py-4
        hover:bg-opacity-80
        shadow-sm
      "
    >
      チャットを始める
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Top",
});
</script>
