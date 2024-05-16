import { useEffect, useRef } from "react";

export const useOnWindowResize = (
  callback: (this: Window, ev: UIEvent) => any
) => {
  const listener = useRef<any>(null);

  useEffect(() => {
    if (listener.current)
      window.removeEventListener("resize", listener.current);
    listener.current = window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", listener.current);
    };
  }, [callback]);
};
