import { Slide, ToastOptions } from "react-toastify";

export const getErrorToastConfig = (
  theme: "dark" | "light" = "light"
): ToastOptions<unknown> | undefined => {
  return {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition: Slide,
  };
};
