export class GameCell {
  value: number;
  positive: boolean;

  hidden = false;

  constructor(public x: number, public y: number, value: number, positive: boolean) {
    this.value = value > 0 ? value : 1;
    this.positive = positive;
  }

  public setHidden(hidden = true): void {
    this.hidden = hidden;
  }

  public cellValue(): number {
    return this.positive ? this.value : 0 - this.value;
  }
}
