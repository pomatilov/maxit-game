import { Player } from './Player';

export class BotPlayer extends Player {
  constructor(id: number, score: number, wins: number) {
    super(id, score, wins);

    super.name = 'Бот';
  }
}
