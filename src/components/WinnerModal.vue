<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { backToMenu } from '@/compositions/BackToMenu';
import { useGameStore } from '@/stores/GameStore';
import GamePlayersInfo from './GamePlayersInfo.vue';

const gameStore = useGameStore();

const { game, isGameOver } = storeToRefs(gameStore);

watch(isGameOver, (value: boolean) => {
  if (value) {
    gameStore.incrementWinnerCount();
  }
});

const startNewGame = () => {
  gameStore.startNewGame();
};
</script>

<template>
  <div
    class="winner-modal"
    :class="{ visible: game.isGameOver }"
  >
    <div
      v-if="game.isGameOver"
      class="winner-modal__body"
    >
      <div class="winner-modal__body_stars">
        <img
          src="../assets/star.svg"
          alt="star"
          width="36"
          height="36"
        />

        <img
          src="../assets/star.svg"
          alt="star"
          width="36"
          height="36"
        />

        <img
          src="../assets/star.svg"
          alt="star"
          width="36"
          height="36"
        />
      </div>

      <h3
        v-if="game.winner"
        class="winner-modal__body_winner"
      >
        Победу одержал<br />
        <h1 class="winner-modal__body_winner-name">{{ game.winner?.name }}</h1>
      </h3>

      <h3
        v-else
        class="winner-modal__body_winner"
      >
        <br />
        <h1 class="winner-modal__body_winner-name">Ничья</h1>
      </h3>

      <GamePlayersInfo
        class="winner-modal__body_stats"
        :game="game"
      />

      <div class="winner-modal__body_controls">
        <button
          type="button"
          class="primary"
          @click="startNewGame"
        >
          Новая игра
        </button>

        <button
          type="button"
          class="secondary"
          @click="backToMenu"
        >
          В меню
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.winner-modal {
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 100%;
  height: inherit;
  min-height: inherit;
  padding: 12px;
  z-index: 999;

  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;

  &.visible {
    top: 0;
    opacity: 1;
    visibility: visible;
  }

  > .winner-modal__body {
    background-color: $c-light;
    border-radius: $border-radius;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-shadow: 0 0 12px $c-grey-75;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > .winner-modal__body_stars {
      display: flex;
      flex-direction: row;
      justify-content: center;

      padding: 0.6rem 0;

      > * {
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    > .winner-modal__body_winner {
      color: $c-dark;
      font-size: 16px;
      text-align: center;

      > .winner-modal__body_winner-name {
        color: $c-red;
        font-size: 40px;
        margin-top: 0.6rem;
      }
    }

    > .winner-modal__body_controls {
      display: flex;
      flex-direction: column;

      > * {
        margin-bottom: 1.2rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

<style>
.winner-modal__body_stats .game-info__player {
  opacity: 1 !important;
}
</style>
