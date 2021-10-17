<template>
  <main>
    <div class="bg-white mx-auto mt-20 py-16 px-20 w-max rounded-lg shadow-sm">
      <h1 class="text-2xl font-bold text-center mb-5">チャットルーム一覧</h1>

      <ol class="mb-10">
        <template v-if="state.isFetchingRooms">
          <li
            v-for="i in 5"
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
      <Button class="mx-auto mb-5" @click="openCreateRoomModal">
        ルームを作成
      </Button>
      <Button :to="{ name: 'top' }" color="bg-green-500" class="mx-auto">
        トップに戻る
      </Button>
    </div>

    <transition name="modal">
      <div
        v-show="state.isShowCreateRoomModal"
        class="overlay"
        @click.self="closeCreateRoomModal"
      >
        <section class="modal rounded table bg-white py-16 px-24">
          <h2 class="text-2xl font-bold text-center mb-5">ルームを作成する</h2>
          <form @submit="createRoom">
            <label class="table mb-4">
              <p class="text-lg text-center mb-3">ルーム名</p>
              <div>
                <input
                  v-model="state.form.name"
                  type="text"
                  name="name"
                  placeholder="雑談部屋"
                  required
                  :maxlength="10"
                  class="
                    input
                    ring-2 ring-gray-300
                    rounded
                    w-full
                    block
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    mb-4
                    py-2
                    px-4
                    text-center
                  "
                />
                <small class="block text-center">※ 10文字以内</small>
              </div>
            </label>
            <Button type="submit" class="mx-auto">作成</Button>
          </form>
        </section>
      </div>
    </transition>
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { api } from "@/api/index";
import { Room } from "@/types";

import Button from "@/components/button/index.vue";

type State = {
  rooms: Room[];
  form: { name: string };
  isShowCreateRoomModal: boolean;
  isFetchingRooms: boolean;
};

export default defineComponent({
  name: "Rooms",
  components: {
    Button,
  },
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

    const createRoom = async (e: Event) => {
      e.preventDefault();
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;

  .modal {
    transition: opacity 0.5s 0.2s, transform 0.5s 0.2s;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transition: opacity 0.5s 0.5s;

  .modal {
    transform: translateY(-40px);
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
  }
}

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
</style>
