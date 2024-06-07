import type { Meta, StoryObj } from "@storybook/react";
import { AppInput } from "./app-input";

const meta: Meta<typeof AppInput> = {
  component: AppInput,
};

export default meta;

type Story = StoryObj<typeof AppInput>;

export const BasicInput: Story = {
  args: {
    label: "basic input",
    placeholder: "type something...",
  },
};

export const ErrorInput: Story = {
  args: {
    label: "error input",
    placeholder: "type something...",
    isError: true,
  },
};

export const SmallInput: Story = {
  args: {
    placeholder: "1",
    small: true,
  },
};

export const DisabledInput: Story = {
  args: {
    label: "disabled",
    placeholder: "disabled",
    disabled: true,
  },
};
