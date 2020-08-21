<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-800 sm:h-screen">
    <head-pattern />

    <main-menu />

    <main class="relative px-2 py-10 mx-auto max-w-7xl sm:px-4 lg:px-8">
      <nuxt />
    </main>

    <legals />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeadPattern from '@/components/HeadPattern.vue'
import MainMenu from '@/components/MainMenu.vue'
import Legals from '@/components/Legals.vue'
export default Vue.extend({
  components: {
    HeadPattern,
    Legals
  }
})
</script>
