import { TimeControls } from "@/shared/types/time-controls";

export const getTimeControlsFromSecods = (seconds: number): TimeControls => {
  if (seconds > 3 * 60) return TimeControls.BULLET;
  if (seconds > 10 * 60) return TimeControls.BLITZ;
  if (seconds > 60 * 60) return TimeControls.RAPID;
  return TimeControls.CLASSICAL;
};
