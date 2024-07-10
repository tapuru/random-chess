// import {
//   gameApi,
//   getFrendlyPlayerColor,
//   getOppositeColor,
// } from "@/entities/game";
// import { profileApi } from "@/entities/profile";
// import { ChessColors } from "@/shared/types/chess-colors";
// import { GameModes } from "@/shared/types/game-modes";
// import { GameTypes } from "@/shared/types/game-type";
// import { AppButton } from "@/shared/ui/app-button/app-button";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { useParams } from "next/navigation";

// export const OnlineGameAcceptRematchButton = () => {
//   //TODO: rewrite all this
//   const params = useParams<{ gameId: string }>();
//   const { data: rematchOffering } = gameApi.useGetRematchDataQuery();
//   const [acceptRematch, { isLoading }] = gameApi.useAcceptRematchMutation();
//   const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
//   if (!rematchOffering || !game) return null;
//   const { data: frendlyPlayer } = profileApi.useGetMeQuery();
//   if (!frendlyPlayer) return null;
//   const frendlyPlayerColor = getFrendlyPlayerColor(game, frendlyPlayer.id);
//   const newGameOwnerColor = getOppositeColor(frendlyPlayerColor);

//   const enemyPlayer =
//     frendlyPlayerColor === ChessColors.BLACK
//       ? game.playerWhite
//       : game.playerBlack;
//   if (!enemyPlayer) return null;

//   const handleClick = async () => {
//     try {
//       const rematchGame = await acceptRematch({
//         newGameData: {
//           initialFen: game.initialFen,
//           ownerColor: newGameOwnerColor,
//           ownerId: frendlyPlayer.id,
//           settings: {
//             gameMode: game.settings.mode,
//             gameType: GameTypes.ONLINE,
//             time: game.settings.time,
//             timeControl: game.settings.timeControl,
//             timeIncrement: game.settings.timeIncrement,
//           },
//         },
//         userId: enemyPlayer.id,
//       });
//       console.log(rematchGame);
//     } catch (error) {
//       //TODO: handle error
//     }
//   };
//   return <AppButton onClick={handleClick}>Accept rematch</AppButton>;
// };
