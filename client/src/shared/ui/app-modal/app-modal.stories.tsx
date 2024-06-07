import type { Meta, StoryObj } from "@storybook/react";
import { AppModal } from "./app-modal";

const meta: Meta<typeof AppModal> = {
  component: AppModal,
};

export default meta;

type Story = StoryObj<typeof AppModal>;

export const LoremModal: Story = {
  args: {
    children: (
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, hic nihil
        illo labore magnam officia minima dolorem provident esse harum facere
        dicta ea, et tempore aut? Veniam quas exercitationem eos.
      </div>
    ),
    title: "lorem title",
    trigger: <button>open modal</button>,
  },
};
