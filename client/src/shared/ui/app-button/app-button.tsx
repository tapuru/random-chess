import cl from "./app-button.module.scss";

interface AppButtonProps {
  size: "sm" | "md" | "lg";
}

export const AppButton = ({ size }: AppButtonProps) => {
  return <button className={cl.root}>{size}</button>;
};
