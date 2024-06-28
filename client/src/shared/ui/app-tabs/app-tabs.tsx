import * as Tabs from "@radix-ui/react-tabs";
import cn from "classnames";
import cl from "./app-tabs.module.scss";
import React from "react";

interface Tab {
  value: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

interface AppTabsProps {
  tabs: Tab[];
  className?: string;
  listOnly?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange: (value: string) => void;
  loop?: boolean;
}

interface AppTabsContentProps {
  value: string;
  content: React.ReactNode;
  className?: string;
}

export const AppTabs = ({
  tabs,
  className,
  listOnly = false,
  loop,
  ...props
}: AppTabsProps) => {
  return (
    <Tabs.Root className={cn(cl.root, className)} {...props}>
      <Tabs.List className={cl.list} loop={loop}>
        {tabs.map((tab) => (
          <Tabs.Trigger
            className={cl.trigger}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {!listOnly &&
        tabs.map((tab) => (
          <Tabs.Content className={cl.content} value={tab.value}>
            {tab.content}
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
};

AppTabs.Content = ({ value, content, className }: AppTabsContentProps) => {
  return (
    <Tabs.Content className={cn(cl.content, className)} value={value}>
      {content}
    </Tabs.Content>
  );
};
