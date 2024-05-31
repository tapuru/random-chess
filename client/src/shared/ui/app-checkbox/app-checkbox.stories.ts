import type { Meta, StoryObj } from "@storybook/react";
import { AppCheckbox } from "./app-checkbox";

const meta: Meta<typeof AppCheckbox> = {
  component: AppCheckbox,
};

export default meta;

type Story = StoryObj<typeof AppCheckbox>;

export const DefaultCheckbox: Story = {
  args: {
    label: "label",
  },
};

export const PrimaryCheckbox: Story = {
  args: {
    label: "primary color",
    color: "primary",
  },
};

export const DisabledCheckbox: Story = {
  args: {
    label: "disabled",
    disabled: true,
    defaultChecked: false,
  },
};
