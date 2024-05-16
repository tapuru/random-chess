import React from "react";
import cl from "./app-card.module.scss";

interface AppCardProps {
  children?: React.ReactNode;
}

export const AppCard = ({ children }: AppCardProps) => {
  return <div className={cl.root}>{children}</div>;
};

AppCard.Content = ({ children }: { children?: React.ReactNode }) => {
  return <div className={cl.content}>{children}</div>;
};
