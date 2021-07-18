<template>
  <h1>チャットルーム一覧</h1>
  <button @click="openCreateRoomModal">ルームを作成</button>

  <div
    v-if="state.isShowCreateRoomModal"
    @click.self="closeCreateRoomModal"
    class="overlay"
  >
    <section class="create-room-modal">
      <h2 class="create-room-modal_title">ルームを作成する</h2>
      <form @submit.prevent="createRoom" class="create-room-modal_form">
        <label class="create-room-modal_form_label">
          <p class="create-room-modal_form_name">ルーム名</p>
          <div class="create-room-modal_form_container">
            <input
              type="text"
              name="name"
              v-model="state.form.name"
              required
              class="create-room-modal_form_input"
            />
          </div>
        </label>
        <button type="submit" class="create-room-modal_form_submit-button">
          作成
        </button>
      </form>
    </section>
  </div>

  <ol>
    <li v-for="room in state.rooms" :key="room.id">
      <router-link :to="{ name: 'room', params: { roomId: room.id } }">
        {{ room.name }}
      </router-link>
    </li>
  </ol>
  <router-link :to="{ name: 'top' }">トップ</router-link>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { api } from "@/api/index";
import { Room } from "@/types";

type State = {
  rooms: Room[];
  form: { name: string };
  isShowCreateRoomModal: boolean;
};

export default defineComponent({
  name: "Rooms",
  setup() {
    const state = reactive<State>({
      rooms: [],
      form: { name: "" },
      isShowCreateRoomModal: false,
    });

    const openCreateRoomModal = () => {
      state.isShowCreateRoomModal = true;
    };

    const closeCreateRoomModal = () => {
      state.isShowCreateRoomModal = false;
    };

    const createRoom = async () => {
      try {
        await api.createRoom(state.form.name);
        closeCreateRoomModal();
        state.form.name = "";
        state.rooms = await api.showRooms();
      } catch (error) {
        console.error(error);
      }
    };

    onBeforeMount(async () => {
      state.rooms = await api.showRooms();
    });

    return { state, openCreateRoomModal, closeCreateRoomModal, createRoom };
  },
});
</script>

<style lang="scss" scoped>
$overlayZIndex: 10;

.overlay {
  position: fixed;
  z-index: $overlayZIndex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #00000080;
  display: grid;
  justify-items: center;
  align-content: center;
}

.create-room-modal {
  background-color: #ffffff;
  width: fit-content;
  height: fit-content;
  padding: 60px 100px;
}

.create-room-modal_form_label {
  display: block;
  margin-bottom: 20px;
}

.create-room-modal_form_input {
  width: 100%;
  line-height: 1.8;
}
</style>
