import { Gaussian } from 'ts-gaussian';
import { GameCell } from './GameCell';

export const MATRIX_LENGTH = 8;

const MAX_VALUE = 15;

const VALUE_DISTRIBUTION_MEAN: number = Math.ceil(MAX_VALUE / 2);
const VALUE_DISTRIBUTION_VARIANCE: number = MAX_VALUE - VALUE_DISTRIBUTION_MEAN;

const VALUE_DISTRIBUTION = new Gaussian(VALUE_DISTRIBUTION_MEAN, VALUE_DISTRIBUTION_VARIANCE);

const POSITIVE_DISTRIBUTION = new Gaussian(1, 1.5);

export class GameBoard {
  matrix: Array<Array<GameCell>> = [];

  create() {
    this.matrix = [];

    for (let i = 0; i < MATRIX_LENGTH; i += 1) {
      const row: Array<GameCell> = [];

      for (let j = 0; j < MATRIX_LENGTH; j += 1) {
        const distributedValue = Math.round(VALUE_DISTRIBUTION.ppf(Math.random()));

        const cellValue = MAX_VALUE - Math.abs(distributedValue);
        const isPositiveValue = cellValue >= MAX_VALUE - 1 || Math.round(POSITIVE_DISTRIBUTION.ppf(Math.random())) > 0;

        row.push(new GameCell(j, i, Math.abs(cellValue), isPositiveValue));
      }

      this.matrix.push(row);
    }
  }

  getCell(rowIndex: number, cellIndex: number): GameCell {
    return this.matrix[rowIndex][cellIndex];
  }
}
