<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

export default defineComponent({
  name: "Button",
  props: {
    to: {
      type: Object as PropType<RouteLocationRaw | null>,
      default: null,
    },
    color: {
      type: String,
      default: "bg-blue-500",
    },
  },
  setup(props) {
    const classNames = [
      "table",
      "font-bold",
      "rounded-md",
      "text-white",
      "px-8",
      "py-4",
      "hover:bg-opacity-80",
      "shadow-sm",
      props.color,
    ];

    return { props, classNames };
  },
});
</script>

<template>
  <router-link v-if="props.to" :to="props.to" :class="classNames">
    <slot />
  </router-link>
  <button v-else :class="classNames">
    <slot />
  </button>
</template>
