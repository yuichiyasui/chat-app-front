<template>
  <h1 class="page-title">チャットルーム一覧</h1>
  <router-link :to="{ name: 'top' }">トップ</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rooms",
  setup() {
    return;
  },
});
</script>
