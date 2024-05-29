import { Meta, StoryObj } from "@storybook/react";
import { AppText } from "./app-text";

const meta: Meta<typeof AppText> = {
  component: AppText,
};

export default meta;

type Story = StoryObj<typeof AppText>;

export const h1: Story = {
  args: {
    tag: "h1",
    children: "Header",
  },
};

export const lightColor: Story = {
  args: {
    color: "text-200",
    children: "lorem ipsum",
  },
};
