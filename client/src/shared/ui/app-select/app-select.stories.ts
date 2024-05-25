import type { Meta, StoryObj } from "@storybook/react";
import { AppSelect, AppSelectOptionGroup } from "./app-select";

const meta: Meta<typeof AppSelect> = {
  component: AppSelect,
};

export default meta;

type Story = StoryObj<typeof AppSelect>;

const basicOptions = [
  { title: "option1", value: "o1" },
  { title: "option2", value: "o2" },
];

export const BasicSelect: Story = {
  args: {
    placeholder: "basic select",
    options: basicOptions,
  },
};

export const UnderlinedSelect: Story = {
  args: {
    options: [
      { title: "Ru", value: "ru" },
      { title: "En", value: "en" },
    ],
    defaultValue: "ru",
    variant: "underlined",
  },
};

const groupedOptions: AppSelectOptionGroup[] = [
  {
    label: "group 1",
    options: [
      { title: "option 1", value: "o1" },
      { title: "option 2", value: "o2" },
      { title: "option 3", value: "o3" },
      { title: "option 4", value: "o4" },
    ],
  },
  {
    label: "group 3",
    options: [
      { title: "option 5", value: "o5" },
      { title: "option 6", value: "o6" },
      { title: "option 7", value: "o7" },
      { title: "option 8", value: "o8" },
    ],
  },
];

export const GroupedSelect: Story = {
  args: {
    placeholder: "grouped select",
    optionGroups: groupedOptions,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "disabled select",
  },
};
