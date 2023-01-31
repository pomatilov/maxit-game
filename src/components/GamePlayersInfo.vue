<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/stores/GameStore';

import { Game } from '@/models/game/Game';

const { game } = storeToRefs(useGameStore());

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
</script>

<template>
  <div class="game-info">
    <div
      class="game-info__player"
      :class="{ current: gameProperty.currentPlayer?.id === gameProperty.firstPlayer?.id }"
    >
      <div class="game-info__player_name">
        <h3>{{ gameProperty.firstPlayer?.name }}</h3>
      </div>

      <div class="game-info__player_score">
        <h2>{{ gameProperty.firstPlayer?.score }}</h2>
      </div>

      <div class="game-info__player_wins">
        <h3>Побед: {{ gameProperty.firstPlayer?.wins }}</h3>
      </div>
    </div>

    <div
      class="game-info__player"
      :class="{ current: gameProperty.currentPlayer?.id === gameProperty.secondPlayer?.id }"
    >
      <div class="game-info__player_name">
        <h3>
          {{ gameProperty.secondPlayer?.name }}
        </h3>
      </div>

      <div class="game-info__player_score">
        <h2>{{ gameProperty.secondPlayer?.score }}</h2>
      </div>

      <div class="game-info__player_wins">
        <h3>Побед: {{ gameProperty.secondPlayer?.wins }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-info {
  /* margin-bottom: 0.75rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.game-info__player {
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  opacity: 0.5;
}

.game-info__player.current {
  opacity: 1;
}

.game-info__player_name {
  color: #f1274c;
  font-size: 16px;
}

.game-info__player_wins > * {
  color: #b3b3b3;
  font-size: 14px;
}

.game-info__player_score {
  padding: 0.5rem 0;
  border-radius: 4px;

  width: 100%;
  text-align: center;

  color: #ffffff;
  background-color: #f78b0b;
}
.game-info__player_score > * {
  font-size: 24px;
  margin: 0;
}
</style>
