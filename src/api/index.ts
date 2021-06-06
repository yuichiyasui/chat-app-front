import { MOCK_ROOMS_DATA } from "./mock/rooms";

export const api = {
  showRooms() {
    return Promise.resolve(MOCK_ROOMS_DATA);
  },
};
