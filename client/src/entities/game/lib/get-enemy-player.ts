import { GameDto } from "../types/game-dto";

export const getEnemyPlayer = (frendlyProfileId?: string, game?: GameDto) => {
  if (!frendlyProfileId || !game) return null;
  if (game.playerBlack?.id === frendlyProfileId) return game.playerWhite;
  if (game.playerWhite?.id === frendlyProfileId) return game.playerBlack;
  return null;
};
