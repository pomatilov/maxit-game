export class Player {
  name: string;

  constructor(public id: number, public score: number, public wins: number) {
    this.name = `Игрок ${id}`;
  }
}
