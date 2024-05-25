import * as Dialog from "@radix-ui/react-dialog";
import cl from "./app-modal.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface AppModalProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AppModal = ({
  children,
  trigger,
  title,
  ...props
}: AppModalProps) => {
  return (
    <Dialog.Root modal {...props}>
      <Dialog.Trigger className={cl.trigger}>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={cl.overlay} />
        <Dialog.Content className={cl.content}>
          <Dialog.Title className={cl.title}>{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button className={cl.closeButton} aria-label="Close">
              <IoCloseOutline size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
