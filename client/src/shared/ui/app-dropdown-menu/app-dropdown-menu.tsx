import cl from "./app-dropdown-menu.module.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaCheck } from "react-icons/fa6";
import cn from "classnames";

interface AppDropdownMenuProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
  withArrow?: boolean;
  label?: string;
  contentClassName?: string;
}

export const AppDropdownMenu = ({
  trigger,
  children,
  side = "bottom",
  onOpenChange,
  defaultOpen,
  open,
  withArrow,
  label,
  contentClassName,
}: AppDropdownMenuProps) => {
  console.log(contentClassName);
  return (
    <DropdownMenu.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
    >
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          className={cn(cl.content, contentClassName)}
          sideOffset={5}
        >
          {label && (
            <>
              <DropdownMenu.Label className={cl.label}>
                {label}
              </DropdownMenu.Label>
              <AppDropdownMenu.Separator />
            </>
          )}
          {children}
          {withArrow && <DropdownMenu.Arrow className={cl.arrow} />}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

AppDropdownMenu.Item = ({
  children,
  disabled,
  onSelect,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
}) => {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cl.item}
      disabled={disabled}
    >
      {children}
    </DropdownMenu.Item>
  );
};

AppDropdownMenu.CheckboxItem = ({
  checked,
  children,
  onCheckedChange,
  disabled,
  onSelect,
}: {
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
}) => {
  return (
    <DropdownMenu.CheckboxItem
      className={cl.checkboxItem}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      onSelect={onSelect}
    >
      <DropdownMenu.ItemIndicator className={cl.itemIndicator}>
        <FaCheck />
      </DropdownMenu.ItemIndicator>
      {children}
    </DropdownMenu.CheckboxItem>
  );
};

AppDropdownMenu.Separator = () => {
  return <DropdownMenu.Separator className={cl.separator} />;
};
