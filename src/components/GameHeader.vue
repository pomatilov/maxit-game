<script setup lang="ts">
import { backToMenu } from '@/compositions/BackToMenu';
</script>

<template>
  <div class="game-header">
    <a
      class="game-header__link"
      href="javascript:void(0);"
      @click="backToMenu"
    >
      <img
        class="logo"
        src="/logo.svg"
        alt="MaxIt Logo"
      />

      <h3 class="title"><span>Max</span><span>It</span></h3>
    </a>
  </div>
</template>

<style scoped lang="scss">
.game-header {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > .game-header__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    > .logo {
      height: 60px;
      padding: 12px 0;
    }

    > .title {
      margin-left: 0.75rem;

      > span {
        &:first-child {
          color: $c-red;
        }

        &:last-child {
          color: $c-blue;
        }
      }
    }
  }
}
</style>
