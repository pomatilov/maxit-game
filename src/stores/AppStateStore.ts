import { defineStore } from 'pinia';

import { AppStateEnum } from '@/models/enums/AppStateEnum';

const appState = AppStateEnum.MenuMain;

export const useAppStateStore = defineStore('AppStateStore', {
  state: () => {
    return {
      appState,
    };
  },

  actions: {
    setAppState(newAppState: AppStateEnum) {
      this.appState = newAppState;
    },
  },
});
