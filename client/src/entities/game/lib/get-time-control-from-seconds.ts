import { TimeControls } from "@/shared/types/time-controls";

export const getTimeControlFromSeconds = (
  seconds: number
): TimeControls | null => {
  const mins = seconds / 60;
  if (mins < 0) return null;
  if (mins > 0 && mins <= 3) return TimeControls.BULLET;
  if (mins > 3 && mins <= 10) return TimeControls.BLITZ;
  if (mins > 10 && mins <= 60) return TimeControls.RAPID;
  return TimeControls.CLASSICAL;
};
