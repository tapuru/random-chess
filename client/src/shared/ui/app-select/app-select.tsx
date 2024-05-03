import * as Select from "@radix-ui/react-select";
import cl from "./app-select.module.scss";
import {
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import React from "react";
import cn from "classnames";

export interface AppSelectOption extends Select.SelectItemProps {
  title: string;
}

export interface AppSelectOptionGroup {
  label: string;
  options: AppSelectOption[];
}

interface AppSelectProps extends Select.SelectProps {
  placeholder?: string;
  withScrollButtons?: boolean;
  options?: AppSelectOption[];
  optionGroups?: AppSelectOptionGroup[];
  variant?: "outlined" | "underlined";
}

export const AppSelect = ({
  placeholder,
  withScrollButtons,
  options,
  optionGroups,
  variant,
  ...props
}: AppSelectProps) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={cn(cl.selectTrigger, {
          [cl.underlined]: variant === "underlined",
        })}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={cl.selectIcon}>
          <MdKeyboardArrowDown size={25} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={cl.selectContent} position="popper">
          {withScrollButtons && (
            <Select.ScrollUpButton className="SelectScrollButton">
              <MdKeyboardArrowUp />
            </Select.ScrollUpButton>
          )}
          <Select.Viewport className="SelectViewport">
            {options?.map((option) => (
              <SelectItem {...option} key={option.value}>
                {option.title}
              </SelectItem>
            ))}
            {optionGroups?.map((group, index) => (
              <div key={group.label}>
                <Select.Group>
                  <Select.Label className={cl.groupLabel}>
                    {group.label}
                  </Select.Label>
                  {group.options.map((option) => (
                    <SelectItem key={option.value} {...option}>
                      {option.title}
                    </SelectItem>
                  ))}
                </Select.Group>
                {index !== optionGroups.length - 1 && (
                  <Select.Separator className={cl.selectDivider} />
                )}
              </div>
            ))}
          </Select.Viewport>
          {withScrollButtons && (
            <Select.ScrollDownButton className="SelectScrollButton">
              <MdKeyboardArrowDown />
            </Select.ScrollDownButton>
          )}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = ({
  children,
  className,
  ...props
}: Select.SelectItemProps) => {
  return (
    <Select.Item className={cn([cl.selectItem], className)} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={cl.selectItemIndicator}>
        <MdCheck />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
