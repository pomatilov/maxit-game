<script setup lang="ts">
import WinnerModal from '@/components/WinnerModal.vue';

import { backToMenu } from '@/compositions/BackToMenu';

import GameHeader from './GameHeader.vue';
import GamePlayersInfo from './GamePlayersInfo.vue';
import GameBoard from './GameBoard.vue';
</script>

<template>
  <div class="app-game">
    <GameHeader />

    <GamePlayersInfo :game="undefined" />

    <GameBoard :game="undefined" />

    <WinnerModal />

    <div class="app-game__controls">
      <button
        type="button"
        class="app-game__controls_button secondary"
        @click="backToMenu"
      >
        Вернуться в меню
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-game__controls {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  > .app-game__controls_button {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
