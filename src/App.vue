<script setup lang="ts">
import MainView from './views/MainView.vue';
</script>

<template>
  <MainView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48;

  color: #f78b0b;

  font-size: 48px;
}
</style>

<style>
body {
  background: linear-gradient(135deg, #3089db 0%, #e10d63 50%, #f78b0b 100%);
  background-repeat: no-repeat;
}

button {
  outline: none;
}
</style>
