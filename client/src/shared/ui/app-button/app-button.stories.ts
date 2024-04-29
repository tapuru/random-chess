import type { Meta, StoryObj } from "@storybook/react";
import { AppButton } from "./app-button";

const meta: Meta<typeof AppButton> = {
  component: AppButton,
};

export default meta;

type Story = StoryObj<typeof AppButton>;

export const Small: Story = {
  args: { size: "sm" },
};
