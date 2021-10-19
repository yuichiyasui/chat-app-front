import { Room, User } from "@/types";
import fetch from "@/utils/fetch";

export const api = {
  async showRooms(): Promise<Room[]> {
    const response = await fetch("/rooms", {
      method: "GET",
    });
    const json = await response.json<{ data: Room[] }>();

    return json.data || [];
  },
  async fetchRoom(id: number): Promise<Room | null> {
    const response = await fetch(`/rooms/${id}`, {
      method: "GET",
    });
    const json = await response.json<{ data: Room }>();

    return json.data || null;
  },
  async createRoom(name: string): Promise<void> {
    await fetch("/rooms", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },
  async registerUser(name: string): Promise<User | null> {
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const json = await response.json<{ data: User }>();

    return json.data || null;
  },
  async fetchUser(userId: string): Promise<User | null> {
    const response = await fetch(`/users/${userId}`, {
      method: "GET",
    });
    const json = await response.json<{ data: User }>();

    return json.data || null;
  },
};
