<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AppGame from '@/components/AppGame.vue';
import AppMenu from '@/components/AppMenu.vue';
import AppRules from '@/components/AppRules.vue';

import { AppStateEnum } from '@/models/enums/AppStateEnum';

import { useAppStateStore } from '@/stores/AppStateStore';

const appStateStore = useAppStateStore();

const { appState } = storeToRefs(appStateStore);
</script>

<template>
  <div class="container">
    <AppGame v-if="appState === AppStateEnum.Game" />

    <AppRules v-else-if="appState === AppStateEnum.Rules" />

    <AppMenu v-else />
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  min-height: 600px;
  border-radius: $border-radius;
  background-color: $c-light;
  overflow: hidden;
  padding: 20px;

  > * {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 560px;
  }
}
</style>
