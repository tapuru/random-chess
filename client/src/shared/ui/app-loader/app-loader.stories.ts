import type { Meta, StoryObj } from "@storybook/react";
import { AppLoader } from "./app-loader";

const meta: Meta<typeof AppLoader> = {
  component: AppLoader,
};

export default meta;

type Story = StoryObj<typeof AppLoader>;

export const FullscreenLoader: Story = {
  args: {
    fullscreen: true,
  },
};

export const SmallLoader: Story = {
  args: {
    size: "sm",
  },
};

export const MediumLoader: Story = {
  args: {
    size: "md",
  },
};

export const LargeLoader: Story = {
  args: {
    size: "lg",
  },
};

export const SecondaryColorLoader: Story = {
  args: {
    color: "secondary",
  },
};
