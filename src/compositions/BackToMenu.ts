import { AppStateEnum } from '@/models/enums/AppStateEnum';

import { useAppStateStore } from '@/stores/AppStateStore';

export const backToMenu = () => {
  useAppStateStore().setAppState(AppStateEnum.MenuMain);
};
