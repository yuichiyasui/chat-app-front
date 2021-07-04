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
  async createRoom(name: string): Promise<void> {
    const url = "http://localhost:3500/rooms";
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ name }),
    });
  },
};
