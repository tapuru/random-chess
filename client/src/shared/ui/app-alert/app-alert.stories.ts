import type { Meta, StoryObj } from "@storybook/react";
import { AppAlert } from "./app-alert";

const meta: Meta<typeof AppAlert> = {
  component: AppAlert,
};

export default meta;

type Story = StoryObj<typeof AppAlert>;

export const errorAlert: Story = {
  args: {
    children: "error alert",
    variant: "error",
  },
};
