import { Meta, StoryObj } from "@storybook/react";
import { AppText } from "./app-text";

const meta: Meta<typeof AppText> = {
  component: AppText,
};

export default meta;

type Story = StoryObj<typeof AppText>;

export const H1: Story = {
  args: {
    tag: "h1",
    children: "Header",
  },
};

export const LightColor: Story = {
  args: {
    color: "text-200",
    children: "lorem ipsum",
  },
};
