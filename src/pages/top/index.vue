<script lang="ts">
import { defineComponent } from "vue";

import Button from "@/components/button/index.vue";

export default defineComponent({
  name: "Top",
  components: {
    Button,
  },
});
</script>

<template>
  <div class="bg-white mx-auto my-20 py-16 px-20 w-max rounded-lg shadow-sm">
    <!-- イラスト：Loose Drawing https://loosedrawing.com/illust/0309/ -->
    <img
      width="500"
      height="500"
      src="/src/assets/img/chat.png"
      alt="チャットイメージ"
      class="mx-auto"
    />
    <p class="text-xl leading-loose text-center mb-10">
      Vue3 × Vite × Ruby on Rails製の
      <br />
      チャットアプリケーション
    </p>
    <Button :to="{ name: 'rooms' }" color="bg-blue-500" class="mx-auto">
      チャットを始める
    </Button>
  </div>
</template>
