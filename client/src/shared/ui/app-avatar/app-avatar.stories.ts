import type { Meta, StoryObj } from "@storybook/react";
import { AppAvatar } from "./app-avatar";

const meta: Meta<typeof AppAvatar> = {
  component: AppAvatar,
};

export default meta;

type Story = StoryObj<typeof AppAvatar>;

export const NoAvatar: Story = {
  args: {
    alt: "no avatar",
  },
};

export const TestAvatar: Story = {
  args: {
    alt: "test avatar",
    src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  },
};
