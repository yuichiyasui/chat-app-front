import { api } from "@/api";
import { MOCK_ROOMS_DATA } from "@/api/mock/rooms";

describe("apiのテスト", () => {
  test("ルーム一覧を取得する", async () => {
    const response = await api.showRooms();
    expect(response.length).toBe(3);
    expect(JSON.stringify(response)).toBe(JSON.stringify(MOCK_ROOMS_DATA));
  });
});
