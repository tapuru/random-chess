import type { Meta, StoryObj } from "@storybook/react";
import { AppButton } from "./app-button";

const meta: Meta<typeof AppButton> = {
  component: AppButton,
};

export default meta;

type Story = StoryObj<typeof AppButton>;

export const HomePageButton: Story = {
  args: { size: "lg", color: "primary", children: "Создать игру" },
};

export const Link: Story = {
  args: { size: "md", href: "https://google.com" },
};
