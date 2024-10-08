import type { Meta, StoryObj } from "@storybook/react";
import { AppCard } from "./app-card";

const meta: Meta<typeof AppCard> = {
  component: AppCard,
};

export default meta;

type Story = StoryObj<typeof AppCard>;

export const BasicCard: Story = {
  args: {
    children: "card",
  },
};

export const CardWithContent: Story = {
  args: { children: <AppCard.Content>card with content</AppCard.Content> },
};

export const FloatingCard: Story = {
  args: {
    children: <AppCard.Content>floating card</AppCard.Content>,
    variant: "floating",
  },
};
