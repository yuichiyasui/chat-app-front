<template>
  <h1>チャットルーム一覧</h1>
  <ol>
    <li v-for="room in state.rooms" :key="room.id">
      {{ room.name }}
    </li>
  </ol>
  <router-link :to="{ name: 'top' }">トップ</router-link>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { api } from "../../api/index";
import { Room } from "../../types";

type State = {
  rooms: Room[];
};

export default defineComponent({
  name: "Rooms",
  setup() {
    const state = reactive<State>({
      rooms: [],
    });

    onBeforeMount(async () => {
      state.rooms = await api.showRooms();
    });

    return { state };
  },
});
</script>
