<template>
  <header>
    <p class="user">
      {{ userName + "さんがログイン中" }}
    </p>
  </header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { key } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore(key);

    return {
      userName: computed(() => store.state.user.user?.name || "ゲスト"),
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
