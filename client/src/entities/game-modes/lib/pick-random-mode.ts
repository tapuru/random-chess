import { getRandomArrayIndex } from "@/shared/lib/get-random-array-index";
import { GameModes } from "@/shared/types/game-modes";

export const pickRandomMode = (
  options?: Partial<Record<GameModes, boolean>>
): GameModes => {
  let avaliableModes = Object.values(GameModes);
  if (options) {
    avaliableModes = avaliableModes.filter((mode) => options[mode] !== false);
  }
  return avaliableModes[getRandomArrayIndex(avaliableModes)];
};
