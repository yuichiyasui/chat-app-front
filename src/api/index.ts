import { Room } from "@/types";

export const api = {
  async showRooms(): Promise<Room[]> {
    const url = "http://localhost:3500/rooms";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const json = await response.json();
    return json.data;
  },
};
