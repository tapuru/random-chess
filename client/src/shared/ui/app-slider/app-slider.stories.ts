import type { Meta, StoryObj } from "@storybook/react";
import { AppSlider } from "./app-slider";

const meta: Meta<typeof AppSlider> = {
  component: AppSlider,
};

export default meta;

type Story = StoryObj<typeof AppSlider>;

export const DefaultSlider: Story = {
  args: {
    min: 1,
    max: 100,
    defaultValue: [50],
  },
};

export const PrimarySlider: Story = {
  args: {
    min: 1,
    max: 100,
    defaultValue: [50],
    color: "primary",
  },
};

export const DoubleSlider: Story = {
  args: {
    min: 1,
    max: 100,
    defaultValue: [10, 80],
    minStepsBetweenThumbs: 1,
  },
};

export const MultipleSlider: Story = {
  args: {
    min: 1,
    max: 100,
    defaultValue: [10, 40, 70, 80],
    minStepsBetweenThumbs: 1,
  },
};

export const DisabledSlider: Story = {
  args: {
    min: 1,
    max: 100,
    defaultValue: [50],
    minStepsBetweenThumbs: 1,
    disabled: true,
  },
};
