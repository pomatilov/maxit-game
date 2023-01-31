<script setup lang="ts">
import { backToMenu } from '@/compositions/BackToMenu';

import GameHeader from './GameHeader.vue';
import GameRules from './GameRules.vue';
</script>

<template>
  <div class="app-rules">
    <GameHeader />

    <GameRules />

    <div class="app-rules__controls">
      <button
        type="button"
        class="app-rules__controls_button secondary"
        @click="backToMenu"
      >
        Вернуться в меню
      </button>
    </div>
  </div>
</template>
