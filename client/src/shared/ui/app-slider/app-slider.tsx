import cl from "./app-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";
import cn from "classnames";
import React from "react";

interface AppSliderProps extends Slider.SliderProps {
  color?: "primary" | "secondary";
}

export const AppSlider = React.forwardRef<HTMLDivElement, AppSliderProps>(
  ({ color = "secondary", ...props }, ref) => {
    const value = props.value || props.defaultValue;

    return (
      <Slider.Root
        className={cn(cl.root, {
          [cl.primary]: color === "primary",
          [cl.secondary]: color === "secondary",
        })}
        {...props}
        ref={ref}
      >
        <Slider.Track className={cl.track}>
          <Slider.Range className={cl.range} />
        </Slider.Track>
        {value?.map((_, i) => <Slider.Thumb className={cl.thumb} key={i} />)}
      </Slider.Root>
    );
  }
);
