import cl from "./app-slider.module.scss";
import * as Slider from "@radix-ui/react-slider";
import cn from "classnames";

interface AppRangeSliderProps extends Slider.SliderProps {
  color?: "primary" | "secondary";
}

export const AppSlider = ({
  color = "secondary",
  ...props
}: AppRangeSliderProps) => {
  const value = props.value || props.defaultValue;

  return (
    <Slider.Root
      className={cn(cl.root, {
        [cl.primary]: color === "primary",
        [cl.secondary]: color === "secondary",
      })}
      {...props}
    >
      <Slider.Track className={cl.track}>
        <Slider.Range className={cl.range} />
      </Slider.Track>
      {value?.map((_, i) => <Slider.Thumb className={cl.thumb} key={i} />)}
    </Slider.Root>
  );
};
