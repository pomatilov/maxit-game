import { defineStore, StateTree } from 'pinia';

import { GameModeEnum } from '@/models/enums/GameModeEnum';
import { Game } from '@/models/game/Game';
import { GameCell } from '@/models/game/GameCell';

const game = new Game();

export const useGameStore = defineStore('GameStore', {
  state: () => {
    return {
      game,
    };
  },

  actions: {
    setGameMode(gameMode: GameModeEnum) {
      this.game.setGameMode(gameMode);
    },

    startNewGame() {
      this.game.startNewGame();
    },

    makeMove(cell: GameCell) {
      this.game.makeMove(cell);
    },

    botPlay() {
      this.game.botPlay();
    },

    incrementWinnerCount() {
      this.game.incrementWinnerCount();
    },
  },

  getters: {
    isBotTurn: (state) => {
      return state.game.isBotTurn;
    },

    isCellClickable: (state) => (cell: GameCell) => {
      return state.game.isCellClickable(cell);
    },

    isGameOver: (state) => {
      return state.game.isGameOver;
    },
  },

  persist: {
    storage: localStorage,

    serializer: {
      serialize: (value: StateTree): string => {
        return JSON.stringify(value.game);
      },

      deserialize: (value: string): StateTree => {
        const parsedGame = JSON.parse(value);

        return { game: Game.clone(parsedGame) };
      },
    },
  },
});
