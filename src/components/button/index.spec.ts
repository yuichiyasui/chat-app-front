import { mount } from "@vue/test-utils";

import Button from "@/components/button/index.vue";

describe("Button", () => {
  test("「ボタン」と表示される", async () => {
    const wrapper = mount(Button, {
      props: { to: { name: "top" } },
      slots: {
        default: "ボタン",
      },
      global: {
        stubs: ["router-link"],
        renderStubDefaultSlot: true,
      },
    });

    expect(wrapper.find("router-link-stub").text()).toBe("ボタン");
  });

  test("リンクを渡さない場合buttonタグで出力される", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "ボタン",
      },
      global: {
        stubs: ["router-link"],
      },
    });

    expect(wrapper.find("button")).toBeTruthy();
  });
});
