<script setup lang="ts">
import { watch, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { AppStateEnum } from '@/models/enums/AppStateEnum';
import { Game } from '@/models/game/Game';
import { GameCell } from '@/models/game/GameCell';

import { useAppStateStore } from '@/stores/AppStateStore';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const { appState } = storeToRefs(useAppStateStore());
const { game, isBotTurn } = storeToRefs(gameStore);

const props = withDefaults(
  defineProps<{
    game: Game;
  }>(),
  {
    game: undefined,
  },
);

const gameProperty = computed(() => {
  if (props.game) {
    return props.game;
  }

  return game.value;
});

watch(
  isBotTurn,
  (value) => {
    if (value) {
      setTimeout(() => {
        if (appState.value === AppStateEnum.Game) {
          gameStore.botPlay();
        }
      }, 2000);
    }
  },
  { immediate: true },
);

const onCellClick = (cell: GameCell) => {
  if (props.game) {
    return;
  }

  if (cell.hidden) {
    return;
  }

  if (gameStore.isBotTurn) {
    return;
  }

  if (gameStore.isCellClickable(cell) === false) {
    return;
  }

  gameStore.makeMove(cell);
};
</script>

<template>
  <div class="game-board">
    <div
      v-for="(matrixRow, rowIndex) in gameProperty.gameBoard.matrix"
      :key="rowIndex"
      class="game-board__row"
    >
      <div
        v-for="(cell, cellIndex) in matrixRow"
        :key="cellIndex"
        class="game-board__row_cell"
        :class="{
          positive: cell.positive,
          hidden: cell.hidden,
          active: gameProperty.isCellClickable(cell),
          clickable: gameProperty.isBotTurn === false,
        }"
        @click="() => onCellClick(cell)"
      >
        <span>{{ cell.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;

  background-color: rgba(179, 179, 179, 0.25);
  /* border: 1px solid #1a1a1a; */
  border-radius: 4px;
  padding: 1px;

  overflow: hidden;
}

.game-board__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  width: 100%;
  margin: 1px 0;
}

.game-board__row:first-child {
  margin-top: 0;
}

.game-board__row:last-child {
  margin-bottom: 0;
}

.game-board__row_cell {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;

  width: 32px;
  height: 32px;
  margin: 0 1px;

  opacity: 0.5;
  border-radius: 4px;

  overflow: hidden;

  background-color: #f1274c;
  color: #f0f0f0;
}

.game-board__row_cell span {
  height: 16px;
  line-height: 1;
  margin-top: 2px;
}

.game-board__row_cell:first-child {
  margin-left: 0;
}

.game-board__row_cell:last-child {
  margin-right: 0;
}

.game-board__row_cell.positive {
  background-color: #3089db;
}

.game-board__row_cell.hidden {
  opacity: 0;
  visibility: hidden;
}

.game-board__row_cell.active {
  opacity: 1;
}
.game-board__row_cell.active.clickable {
  cursor: pointer;
}
</style>
