<template>
  <main>
    <div class="bg-white mx-auto mt-20 py-16 px-20 w-max rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-center mb-5">チャットルーム一覧</h1>

      <ol class="mb-10">
        <template v-if="state.isFetchingRooms">
          <li
            v-for="i in 2"
            :key="`fake-room-${i}`"
            class="animate-pulse mb-4 last:mb-0"
          >
            <div class="bg-gray-200 h-7 rounded-sm"></div>
          </li>
        </template>
        <template v-else-if="state.rooms.length">
          <li
            v-for="room in state.rooms"
            :key="room.id"
            class="text-center h-7 mb-4 last:mb-0"
          >
            <router-link
              :to="{ name: 'room', params: { roomId: room.id } }"
              class="text-blue-500 hover:text-blue-700 text-lg"
            >
              {{ room.name }}
            </router-link>
          </li>
        </template>
      </ol>
      <button
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
          mb-5
        "
        @click="openCreateRoomModal"
      >
        ルームを作成
      </button>
      <router-link
        :to="{ name: 'top' }"
        class="
          table
          mx-auto
          bg-green-500
          text-white
          font-bold
          rounded-md
          px-8
          py-4
          hover:bg-opacity-80
          shadow-sm
        "
      >
        トップに戻る
      </router-link>
    </div>

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
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { api } from "@/api/index";
import { Room } from "@/types";

type State = {
  rooms: Room[];
  form: { name: string };
  isShowCreateRoomModal: boolean;
  isFetchingRooms: boolean;
};

export default defineComponent({
  name: "Rooms",
  setup() {
    const state = reactive<State>({
      rooms: [],
      form: { name: "" },
      isShowCreateRoomModal: false,
      isFetchingRooms: true,
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
      setTimeout(() => {
        state.isFetchingRooms = false;
      }, 1000);
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
