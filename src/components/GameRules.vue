<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Navigation, Pagination } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';
import { Swiper, SwiperModule } from 'swiper/types';

import { Game } from '@/models/game/Game';
import { GameModeEnum } from '@/models/enums/GameModeEnum';
import { GameStateEnum } from '@/models/enums/GameStateEnum';

import GameBoard from './GameBoard.vue';
import GamePlayersInfo from './GamePlayersInfo.vue';
import { GameCell } from '@/models/game/GameCell';

const game = new Game();
const gameRef: Ref<Game> = ref(game);

const swiperModules: SwiperModule[] = [Navigation, Pagination];

const viewedSlides: number[] = [];

const onSlideChange = (swiper: Swiper) => {
  const { activeIndex, previousIndex } = swiper;

  if (activeIndex === 1) {
    gameRef.value.setGameMode(GameModeEnum.TwoPlayers);
    gameRef.value.startNewGame();
    gameRef.value.gameState = GameStateEnum.FirstPlayerTurn;

    viewedSlides.splice(0);
    viewedSlides.push(activeIndex);

    return;
  }

  if (viewedSlides.includes(activeIndex) || previousIndex > activeIndex) {
    return;
  }

  viewedSlides.push(activeIndex);

  if (activeIndex === 3) {
    const availableMoves = gameRef.value.getAllPossibleMoves();

    setTimeout(() => {
      gameRef.value.makeMove(availableMoves[Math.floor(Math.random() * availableMoves.length)]);
    }, 1000);

    return;
  }

  if (activeIndex === 4) {
    let availableMoves = gameRef.value.getAllPossibleMoves();

    let isAvailableMovesNegative = true;

    if (availableMoves.length > 0) {
      isAvailableMovesNegative = availableMoves.reduce(
        (result: boolean, cell: GameCell) => result && cell.positive === false,
        true,
      );
    }

    while (isAvailableMovesNegative === false) {
      gameRef.value.makeMove(availableMoves[Math.floor(Math.random() * availableMoves.length)]);

      availableMoves = gameRef.value.getAllPossibleMoves();

      isAvailableMovesNegative = availableMoves.reduce(
        (result: boolean, cell: GameCell) => result && cell.positive === false,
        true,
      );
    }

    return;
  }

  if (activeIndex === 5) {
    if (gameRef.value.lastSelectedCell) {
      const lastCell = gameRef.value.lastSelectedCell;

      gameRef.value.undoMove(lastCell);

      setTimeout(() => {
        gameRef.value.makeMove(lastCell);
      }, 1000);
    }
  }
};
</script>

<template>
  <div class="game-rules">
    <SwiperComponent
      class="game-rules__slider"
      :modules="swiperModules"
      :slides-per-view="1"
      centered-slides
      navigation
      pagination
      @slide-change="onSlideChange"
    >
      <SwiperSlide class="game-rules__slider_slide game-description">
        <div class="rule">
          <p>
            <span class="color-red">Max</span><span class="color-blue">It</span> - Увлекательная логическая игра на
            двоих, где оппонентом может выступать как компьютер, <br />так и другой человек.
          </p>

          <p>Игровое поле представляет собой квадрат, разбитый<br />на 64 клетки.</p>

          <p>В каждой из клеток записано число от 1 до 15.</p>

          <p>Причём числа могут принимать<br />как положительное,<br />так и отрицательное значение.</p>
        </div>
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>
            Числа, выделенные <span class="blue">синим цветом</span> добавляют очки,<br />а выделенные
            <span class="red">красным</span> - отнимают.
          </p>
        </div>

        <GameBoard :game="gameRef" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>Первый ход определяется случайным образом между игроками.</p>
          <p>Статус хода можно понять по выделению в таблице очков.</p>
        </div>

        <GamePlayersInfo :game="gameRef" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>Игрок, который ходит первым - будет ходить по горизонтали.</p>
          <p>Ход следующего игрока будет уже по вертикали.</p>
        </div>

        <GameBoard :game="gameRef" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>
            По очереди совершая ходы, игроки двигают курсор по клеткам и набирают очки, стремясь набрать как можно более
            высокий результат.
          </p>
        </div>

        <GamePlayersInfo :game="gameRef" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>
            Игроки также могут не просто собирать наиболее высокие числа в текущем ряду/столбце, но и играть на
            понижение счёта противника.
          </p>
        </div>

        <GameBoard :game="gameRef" />
      </SwiperSlide>
    </SwiperComponent>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48;

  color: $c-yellow;

  font-size: 48px;
}
</style>

<style lang="scss">
@import 'swiper/css/bundle';

:root {
  --swiper-navigation-size: 22px;
  --swiper-theme-color: #e10d63;
}

.swiper-button-next,
.swiper-button-prev {
  top: unset;
  bottom: 10px;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  width: calc(100% - 88px);
  left: 44px;
  right: 44px;
}
</style>

<style scoped lang="scss">
.game-rules__slider {
  width: 100%;
  min-height: 414px;

  .game-rules__slider_slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 414px;

    > * {
      &:last-child {
        margin-bottom: 44px;
      }
    }

    * {
      pointer-events: none;
      user-select: none;
    }

    > .rule {
      > p {
        font-size: 14px;
        text-align: left;
        width: 100%;
        color: $c-dark;
        margin-top: 0;
      }
    }
  }
}
</style>
