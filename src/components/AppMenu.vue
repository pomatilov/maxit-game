<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { backToMenu } from '@/compositions/BackToMenu';

import { AppStateEnum } from '@/models/enums/AppStateEnum';
import { GameModeEnum } from '@/models/enums/GameModeEnum';

import { useAppStateStore } from '@/stores/AppStateStore';
import { useGameStore } from '@/stores/GameStore';

const appStateStore = useAppStateStore();
const gameStore = useGameStore();

const { appState } = storeToRefs(appStateStore);
const { game } = storeToRefs(gameStore);

const windowHasOpener = window.opener !== null;

const onNewGameClick = () => {
  appStateStore.setAppState(AppStateEnum.MenuNewGame);
};

const onNewOnePlayerGameClick = () => {
  appStateStore.setAppState(AppStateEnum.Game);

  gameStore.setGameMode(GameModeEnum.OnePlayer);
  gameStore.startNewGame();
};

const onNewTwoPlayersGameClick = () => {
  appStateStore.setAppState(AppStateEnum.Game);

  gameStore.setGameMode(GameModeEnum.TwoPlayers);
  gameStore.startNewGame();
};

const onContinueGameClick = () => {
  appStateStore.setAppState(AppStateEnum.Game);
};

const onViewRulesClick = () => {
  appStateStore.setAppState(AppStateEnum.Rules);
};

const onExitClick = () => {
  window.close();
};
</script>

<template>
  <div class="app-menu">
    <div class="app-menu_head">
      <img
        class="logo"
        src="/logo.svg"
        alt="MaxIt - математическая игра"
        width="100"
        height="100"
      />
      <h1 class="title"><span>Max</span><span>It</span></h1>
    </div>

    <div
      v-if="appState === AppStateEnum.MenuMain"
      class="app-menu__list app-menu__main"
    >
      <button
        type="button"
        class="app-menu__list_item app-menu__button primary"
        :class="{ disabled: game.gameMode === GameModeEnum.NotInitialized }"
        :disabled="game.gameMode === GameModeEnum.NotInitialized"
        @click="onContinueGameClick"
      >
        Продолжить
      </button>

      <button
        type="button"
        class="app-menu__list_item app-menu__button primary"
        @click="onNewGameClick"
      >
        Новая игра
      </button>

      <button
        type="button"
        class="app-menu__list_item app-menu__button"
        @click="onViewRulesClick"
      >
        Правила
      </button>

      <button
        v-if="windowHasOpener"
        type="button"
        class="app-menu__list_item app-menu__button secondary"
        @click="onExitClick"
      >
        Выход
      </button>
    </div>

    <div
      v-if="appState === AppStateEnum.MenuNewGame"
      class="app-menu__list app-menu__new-game"
    >
      <div class="app-menu__list_item">
        <button
          type="button"
          class="app-menu__button primary"
          @click="onNewOnePlayerGameClick"
        >
          1 Игрок
        </button>

        <span class="app-menu__new-game_mode-description">Человек против машины</span>
      </div>

      <div class="app-menu__list_item">
        <button
          type="button"
          class="app-menu__button primary"
          @click="onNewTwoPlayersGameClick"
        >
          2 Игрока
        </button>

        <span class="app-menu__new-game_mode-description">2 игрока — 1 устройство</span>
      </div>

      <div class="app-menu__list_item">
        <button
          type="button"
          class="app-menu__button secondary"
          @click="backToMenu"
        >
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-menu > .app-menu_head {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
}

.app-menu > .app-menu_head > .title > span:first-child {
  color: #f1274c;
}

.app-menu > .app-menu_head > .title > span:last-child {
  color: #3089db;
}

.app-menu > .app-menu_head > .subtitle {
  font-size: 14px;
  margin-top: 0.75rem;
  text-align: center;
}

.app-menu > .app-menu__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 250px;
  width: 100%;
}

.app-menu > .app-menu__list > .app-menu__list_item {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin-bottom: 1.25rem;
}

.app-menu > .app-menu__list > .app-menu__list_item:last-child {
  margin-bottom: 0;
}

.app-menu .app-menu__button {
  width: 100%;
}

.app-menu__new-game_mode-description {
  font-size: 14px;
  color: #b3b3b3;

  margin-top: 0.5rem;
}
</style>
