import { Meta, StoryObj } from "@storybook/react";
import { AppTabs } from "./app-tabs";

const meta: Meta<typeof AppTabs> = {
  component: AppTabs,
};

export default meta;

type Story = StoryObj<typeof AppTabs>;

export const Tabs: Story = {
  args: {
    tabs: [
      { label: "tab1", value: "tab1", content: "tab1 content" },
      { label: "tab2", value: "tab2", content: "tab2 content" },
      { label: "tab3", value: "tab3", content: "tab3 content" },
      { label: "disabled tab", value: "tab4", content: "tab4", disabled: true },
    ],
    defaultValue: "tab1",
  },
};
