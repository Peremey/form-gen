<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>

      <RouterLink to="/">Пример 1</RouterLink>
      <RouterLink to="/example2">Пример 2</RouterLink>
      <RouterLink to="/example3">Пример 3</RouterLink>
      <RouterLink to="/example4">Пример 4</RouterLink>
      <RouterLink to="/example5">Пример 5</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
