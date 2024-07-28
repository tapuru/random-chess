import type { Meta, StoryObj } from "@storybook/react";
import { AppDropdownMenu } from "./app-dropdown-menu";

const meta: Meta<typeof AppDropdownMenu> = {
  component: AppDropdownMenu,
};

export default meta;

type Story = StoryObj<typeof AppDropdownMenu>;

export const BasicMenu: Story = {
  args: {
    children: (
      <>
        <AppDropdownMenu.Item>Item 1</AppDropdownMenu.Item>
        <AppDropdownMenu.Item>Item 2</AppDropdownMenu.Item>
      </>
    ),
    trigger: <span>Open</span>,
  },
};

export const MenuWithCheckboxes: Story = {
  args: {
    trigger: <span>Open</span>,
    label: "checkbox dropdown ",
    children: (
      <>
        <AppDropdownMenu.CheckboxItem checked>
          Checkbox 1
        </AppDropdownMenu.CheckboxItem>
        <AppDropdownMenu.CheckboxItem>Checkbox 2</AppDropdownMenu.CheckboxItem>
        <AppDropdownMenu.CheckboxItem disabled>
          Checkbox disabled
        </AppDropdownMenu.CheckboxItem>
      </>
    ),
    withArrow: true,
  },
};
