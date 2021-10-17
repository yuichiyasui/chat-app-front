<script lang="ts">
import { defineComponent } from "vue";

import Button from "@/components/button/index.vue";

export default defineComponent({
  name: "NotFound",
  components: {
    Button,
  },
});
</script>

<template>
  <div class="bg-white mx-auto mt-20 py-16 px-20 w-max rounded-lg shadow-sm">
    <h1 class="text-center">
      <span class="block text-5xl font-bold mb-4">404</span>
      <span class="text-3xl">Not Found</span>
    </h1>
    <img
      width="200"
      height="200"
      src="/src/assets/img/404.png"
      alt="ページが見つかりませんでした"
      class="mx-auto"
    />
    <p class="text-center mb-10">ページが見つかりませんでした。</p>
    <Button :to="{ name: 'top' }" class="mx-auto">トップ</Button>
  </div>
</template>
