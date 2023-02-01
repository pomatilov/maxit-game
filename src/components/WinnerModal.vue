<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import { backToMenu } from '@/compositions/BackToMenu';
import { useGameStore } from '@/stores/GameStore';

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
    <div class="winner-modal__body">
      <div class="winner-modal__body_stars">
        <span class="material-symbols-outlined"> star </span>
        <span class="material-symbols-outlined"> star </span>
        <span class="material-symbols-outlined"> star </span>
      </div>

      <h3 style="text-align: center">
        Победу одержал<br />
        <h1>{{ game.winner?.name }}</h1>
      </h3>

      <p>Соотношение очков в прошедшей игре:<br />{{ game.firstPlayer?.score }} к {{ game.secondPlayer?.score }}</p>
      <p>Соотношение побед:<br />{{ game.firstPlayer?.wins }} к {{ game.secondPlayer?.wins }}</p>

      <div class="winner-modal__controls">
        <button
          type="button"
          class="winner-modal__controls_button primary"
          @click="startNewGame"
        >
          Новая игра
        </button>

        <button
          type="button"
          class="winner-modal__controls_button secondary"
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
    }

    > h3 {
      color: $c-dark;
      font-size: 16px;
      text-align: center;

      > h1 {
        color: $c-red;
        font-size: 40px;
      }
    }

    > p {
      color: $c-dark;
      font-size: 16px;
      text-align: center;
    }

    .winner-modal__controls {
      display: flex;
      flex-direction: column;

      > * {
        margin-bottom: 1.25rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
