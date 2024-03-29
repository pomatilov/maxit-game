# MaxIt Game

MaxIt - Логическая игра на двоих, где оппонентом может выступать компьютер или другой человек.

## Правила

Игровое поле представляет собой квадрат 8x8.

В каждой из клеток записано число от 1 до 15. Причём числа могут принимать как положительное, так и отрицательное значение.

Числа, расположенные в ячейках окрашенных синим цветом, добавляют очки, а окрашенные красным - отнимают.

Первый ход определяется случайным образом между игроками. Статус хода можно понять по выделению в таблице очков.

Игрок, который ходит первым - будет ходить по горизонтали. Ход следующего игрока будет уже по вертикали.

По очереди совершая ходы, игроки двигают курсор по клеткам и набирают очки, стремясь набрать как можно более высокий результат.

Игроки также могут не просто собирать наиболее высокие числа в текущем ряду/столбце, но и играть на понижение счёта противника.

Основано на игре MaxIt (1982г.)

## Играть онлайн

Игра доступна по ссылке - https://maxit.pomatilov.dev

## Локальный запуск

```shell
npm install && npm run dev
```
