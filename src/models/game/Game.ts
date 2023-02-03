import { EndGameStateEnum } from '@/models/enums/EndGameStateEnum';
import { GameStateEnum } from '@/models/enums/GameStateEnum';
import { GameModeEnum } from '@/models/enums/GameModeEnum';
import { OrientaionEnum } from '@/models/enums/OrientationEnum';

import { calculateOptimalMove } from '@/models/players/BotAI';
import { BotPlayer } from '@/models/players/BotPlayer';
import { Player } from '@/models/players/Player';

import { GameBoard, MATRIX_LENGTH } from './GameBoard';
import { GameCell } from './GameCell';

export class Game {
  firstPlayer: Player | undefined = undefined;
  secondPlayer: Player | undefined = undefined;

  gameMode: GameModeEnum = GameModeEnum.NotInitialized;
  gameState: GameStateEnum = GameStateEnum.FirstPlayerTurn;
  endGameState: EndGameStateEnum | undefined = undefined;

  currentOrientation: OrientaionEnum = OrientaionEnum.Horizontal;

  gameBoard: GameBoard = new GameBoard();
  gameBoardLength: number = MATRIX_LENGTH;

  moves: GameCell[] = [];

  static clone(game: Game): Game {
    const cloned = new Game();

    cloned.setGameMode(game.gameMode);

    if (cloned.firstPlayer && game.firstPlayer) {
      cloned.firstPlayer.id = game.firstPlayer.id;
      cloned.firstPlayer.score = game.firstPlayer.score;
      cloned.firstPlayer.wins = game.firstPlayer.wins;
    }

    if (cloned.secondPlayer && game.secondPlayer) {
      cloned.secondPlayer.id = game.secondPlayer.id;
      cloned.secondPlayer.score = game.secondPlayer.score;
      cloned.secondPlayer.wins = game.secondPlayer.wins;
    }

    cloned.gameState = game.gameState;
    cloned.endGameState = game.endGameState;
    cloned.currentOrientation = game.currentOrientation;

    cloned.gameBoard.matrix = [];

    for (let i = 0; i < game.gameBoardLength ?? 0; i += 1) {
      const row: Array<GameCell> = [];

      for (let j = 0; j < game.gameBoardLength ?? 0; j += 1) {
        const cell = game.gameBoard?.matrix[i][j];
        const gameCell = new GameCell(j, i, cell.value, cell.positive);

        gameCell.hidden = cell.hidden;

        row.push(gameCell);
      }

      cloned.gameBoard.matrix.push(row);
    }

    cloned.moves = [];

    for (let i = 0; i < game.moves?.length ?? 0; i += 1) {
      const cell = game.moves[i];

      const gameCell = game.gameBoard.matrix[cell.y][cell.x];

      cloned.moves.push(gameCell);
    }

    return cloned;
  }

  get currentPlayer(): Player | undefined {
    if (this.gameState === GameStateEnum.FirstPlayerTurn) {
      return this.firstPlayer;
    }

    if (this.gameState === GameStateEnum.SecondPlayerTurn) {
      return this.secondPlayer;
    }

    return undefined;
  }

  get winner(): Player | undefined {
    if (this.endGameState === EndGameStateEnum.FirstPlayerWin) {
      return this.firstPlayer;
    }

    if (this.endGameState === EndGameStateEnum.SecondPlayerWin) {
      return this.secondPlayer;
    }

    return undefined;
  }

  get isBotTurn(): boolean {
    return (
      this.gameMode === GameModeEnum.OnePlayer &&
      this.endGameState == undefined &&
      this.currentPlayer instanceof BotPlayer
    );
  }

  get isGameOver(): boolean {
    return this.endGameState !== undefined;
  }

  get lastSelectedCell(): GameCell | undefined {
    if (this.moves.length > 0) {
      return this.moves[this.moves.length - 1];
    }

    return undefined;
  }

  setGameMode(gameMode: GameModeEnum): void {
    this.gameMode = gameMode;

    switch (this.gameMode) {
      case GameModeEnum.OnePlayer:
        this.firstPlayer = new Player(1, 0, 0);
        this.secondPlayer = new BotPlayer(2, 0, 0);
        break;

      case GameModeEnum.TwoPlayers:
        this.firstPlayer = new Player(1, 0, 0);
        this.secondPlayer = new Player(2, 0, 0);
        break;
    }
  }

  startNewGame(): void {
    this.gameState = Math.random() > 0.5 ? GameStateEnum.FirstPlayerTurn : GameStateEnum.SecondPlayerTurn;
    this.endGameState = undefined;

    this.currentOrientation = OrientaionEnum.Horizontal;

    this.gameBoard.create();
    this.gameBoard.getCell(this.gameBoardLength - 1, 0).setHidden();

    this.moves = [];
    this.moves.push(this.gameBoard.getCell(this.gameBoardLength - 1, 0));

    if (this.firstPlayer && this.secondPlayer) {
      this.firstPlayer.score = 0;
      this.secondPlayer.score = 0;
    }
  }

  makeMove(cell: GameCell): void {
    if (this.currentPlayer) {
      this.currentPlayer.score += cell.cellValue();
    }

    cell.setHidden();

    this.moves.push(cell);

    this.toggleOrientation();
    this.toggleGameState();

    this.checkEndGame();
  }

  undoMove(cell: GameCell): void {
    if (this.moves.length < 2) {
      return;
    }

    this.toggleOrientation();
    this.toggleGameState();

    if (this.currentPlayer) {
      this.currentPlayer.score -= cell.cellValue();
    }

    cell.setHidden(false);

    this.moves.pop();

    this.checkEndGame();
  }

  botPlay(): void {
    if (this.gameState === GameStateEnum.SecondPlayerTurn && this.secondPlayer instanceof BotPlayer) {
      const optimalMove = calculateOptimalMove(Game.clone(this));

      if (optimalMove) {
        this.makeMove(this.gameBoard.getCell(optimalMove.y, optimalMove.x));
      }
    }
  }

  incrementWinnerCount(): void {
    if (this.firstPlayer && this.secondPlayer) {
      switch (this.endGameState) {
        case EndGameStateEnum.FirstPlayerWin:
          this.firstPlayer.wins += 1;
          break;

        case EndGameStateEnum.SecondPlayerWin:
          this.secondPlayer.wins += 1;
          break;

        default:
          break;
      }
    }
  }

  isCellClickable(cell: GameCell): boolean {
    if (this.endGameState !== undefined) {
      return false;
    }

    return (
      (this.currentOrientation === OrientaionEnum.Horizontal && this.lastSelectedCell?.y === cell.y) ||
      (this.currentOrientation === OrientaionEnum.Vertical && this.lastSelectedCell?.x === cell.x)
    );
  }

  toggleOrientation(): void {
    this.currentOrientation =
      this.currentOrientation === OrientaionEnum.Vertical ? OrientaionEnum.Horizontal : OrientaionEnum.Vertical;
  }

  toggleGameState(): void {
    this.gameState =
      this.gameState === GameStateEnum.FirstPlayerTurn ? GameStateEnum.SecondPlayerTurn : GameStateEnum.FirstPlayerTurn;
  }

  checkEndGame(): void {
    this.endGameState = undefined;

    if (this.hasAvailableTurns() === false && this.firstPlayer && this.secondPlayer) {
      if (this.firstPlayer.score === this.secondPlayer.score) {
        this.endGameState = EndGameStateEnum.Draw;
      } else if (Number(this.firstPlayer.score) > Number(this.secondPlayer.score)) {
        this.endGameState = EndGameStateEnum.FirstPlayerWin;
      } else {
        this.endGameState = EndGameStateEnum.SecondPlayerWin;
      }
    }
  }

  getAllPossibleMoves(): GameCell[] {
    const moves: GameCell[] = [];
    const lastSelectedCell = this.moves[this.moves.length - 1];

    if (lastSelectedCell) {
      const columnIndex = lastSelectedCell.x;
      const rowIndex = lastSelectedCell.y;

      if (this.currentOrientation === OrientaionEnum.Horizontal) {
        for (let i = 0; i < this.gameBoardLength; i += 1) {
          if (i !== columnIndex && this.gameBoard.getCell(rowIndex, i).hidden === false) {
            moves.push(this.gameBoard.getCell(rowIndex, i));
          }
        }
      } else if (this.currentOrientation === OrientaionEnum.Vertical) {
        for (let j = 0; j < this.gameBoardLength; j += 1) {
          if (j !== rowIndex && this.gameBoard.getCell(j, columnIndex).hidden === false) {
            moves.push(this.gameBoard.getCell(j, columnIndex));
          }
        }
      }
    }

    return moves;
  }

  hasAvailableTurns(): boolean {
    const lastSelectedCell = this.moves[this.moves.length - 1];

    if (lastSelectedCell) {
      if (this.currentOrientation === OrientaionEnum.Horizontal) {
        const rowIndex = lastSelectedCell.y;

        for (let j = 0; j < this.gameBoardLength; j += 1) {
          if (this.gameBoard.getCell(rowIndex, j).hidden === false) {
            return true;
          }
        }
      } else if (this.currentOrientation === OrientaionEnum.Vertical) {
        const cellIndex = lastSelectedCell.x;

        for (let i = 0; i < this.gameBoardLength; i += 1) {
          if (this.gameBoard.getCell(i, cellIndex).hidden === false) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
