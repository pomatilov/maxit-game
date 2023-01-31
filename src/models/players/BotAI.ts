import { Game } from '@/models/game/Game';
import { GameCell } from '@/models/game/GameCell';
import { GameStateEnum } from '@/models/enums/GameStateEnum';

const MAX_DEPTH = 8;

const negamax = (game: Game, depth: number, alpha: number, beta: number, color: number): number => {
  if (depth === 0 || game.endGameState !== undefined) {
    const depthDiff = -MAX_DEPTH * (depth - MAX_DEPTH);
    const scoreDiff = (game.firstPlayer?.score ?? 0) - (game.secondPlayer?.score ?? 0);

    if (depthDiff === 0) {
      return scoreDiff * color;
    }

    return scoreDiff * depthDiff * color;
  }

  let value = -Infinity;

  const moves: GameCell[] = game.getAllPossibleMoves();

  for (let i = 0; i < moves.length; i += 1) {
    const move: GameCell = moves[i];

    game.makeMove(move);

    value = Math.max(value, -negamax(game, depth - 1, -beta, -alpha, -color));

    alpha = Math.max(alpha, value);

    game.undoMove(move);
  }

  return value;
};

export const calculateOptimalMove = (game: Game, depth: number = MAX_DEPTH): GameCell | undefined => {
  const color = game.gameState === GameStateEnum.FirstPlayerTurn ? 1 : -1;
  const moves: GameCell[] = game.getAllPossibleMoves();

  let bestMove: GameCell | undefined = undefined;
  let bestScore = -Infinity;

  for (let i = 0; i < moves.length; i += 1) {
    const move: GameCell = moves[i];

    game.makeMove(move);

    const score = negamax(game, depth - 1, -Infinity, Infinity, color);

    game.undoMove(move);

    if (score <= bestScore) {
      continue;
    }

    bestMove = move;
    bestScore = score;
  }

  return bestMove ?? moves.shift();
};
