<template>
  <header class="sticky top-0 shadow bg-green-500 p-4 grid grid-cols-3 gap-x-4">
    <div />
    <component :is="isTop ? 'h1' : 'p'" class="text-center">
      <component
        :is="isTop ? 'span' : 'router-link'"
        :to="{ name: 'top' }"
        class="text-2xl font-bold text-white"
        :class="{ 'hover:text-gray-200': !isTop }"
      >
        Chat App
      </component>
    </component>
    <p class="text-white text-right leading-8">
      {{ "ようこそ " + userName + "さん" }}
    </p>
  </header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore(key);
    const route = useRoute();

    return {
      userName: computed(() => store.state.user.user?.name || "ゲスト"),
      isTop: computed(() => route.path === "/"),
    };
  },
});
</script>

<style lang="postcss">
body {
  min-height: 100vh;
  @apply bg-gray-100;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
