import { MOCK_ROOMS_DATA } from "@/api/mock/rooms";

export const api = {
  showRooms() {
    return Promise.resolve(MOCK_ROOMS_DATA);
  },
};
