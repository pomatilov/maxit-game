<script setup lang="ts">
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { SwiperModule } from 'swiper/types';

import { Game } from '@/models/game/Game';
import { GameModeEnum } from '@/models/enums/GameModeEnum';
import { GameStateEnum } from '@/models/enums/GameStateEnum';

import GameBoard from './GameBoard.vue';
import GamePlayersInfo from './GamePlayersInfo.vue';

const game = new Game();

const swiperModules: SwiperModule[] = [Navigation, Pagination];

game.setGameMode(GameModeEnum.TwoPlayers);
game.startNewGame();
game.gameState = GameStateEnum.FirstPlayerTurn;

const onSlideChange = () => {
  // TODO: Interactive game by slide index
  console.log(123);
};
</script>

<template>
  <div class="game-rules">
    <Swiper
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
            <span class="red">Max</span><span class="blue">It</span> - Увлекательная логическая игра на двоих, где
            оппонентом может выступать как компьютер, <br />так и другой человек.
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

        <GameBoard :game="game" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>Первый ход определяется случайным образом между игроками.</p>
          <p>Статус хода можно понять по выделению в таблице очков.</p>
        </div>

        <GamePlayersInfo :game="game" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>Игрок, который ходит первым - будет ходить по горизонтали.</p>
          <p>Ход следующего игрока будет уже по вертикали.</p>
        </div>

        <GameBoard :game="game" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>
            По очереди совершая ходы, игроки двигают курсор по клеткам и набирают очки, стремясь набрать как можно более
            высокий результат.
          </p>
        </div>

        <GamePlayersInfo :game="game" />
      </SwiperSlide>

      <SwiperSlide class="game-rules__slider_slide">
        <div class="rule">
          <p>
            Игроки также могут не просто собирать наиболее высокие числа в текущем ряду/столбце, но и играть на
            понижение счёта противника.
          </p>
        </div>

        <GameBoard :game="game" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>
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

<style scoped>
.game-rules__slider {
  width: 100%;
  min-height: 400px;
  /* margin-top: 16px; */
}

.game-rules__slider_slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
}

.game-rules__slider_slide > *:last-child {
  margin-bottom: 44px;
}

.game-rules__slider_slide * {
  pointer-events: none;
  user-select: none;
}

.red {
  color: #f1274c;
}

.blue {
  color: #3089db;
}

p {
  font-size: 14px;
  text-align: left;
  width: 100%;
  color: #3f3f3f;
  margin-top: 0;
}
</style>
