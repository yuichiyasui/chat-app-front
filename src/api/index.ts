import { Room, User } from "@/types";

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
  async registerUser(name: string): Promise<User | null> {
    const url = "http://localhost:3500/users";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ name }),
      });
      const json = await response.json();
      console.log("ユーザー登録に成功しました。");
      return json.data;
    } catch (error) {
      console.log("ユーザー登録に失敗しました。");
      console.error(error);
      return Promise.reject(null);
    }
  },
  async fetchUser(userId: string) {
    const url = "http://localhost:3500/users";
    const queryParams = new URLSearchParams({ userId });
    const response = await fetch(`${url}/?${queryParams}`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const json = await response.json();
    return json.data;
  },
};
