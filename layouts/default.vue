<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-800 sm:h-screen">
    <head-pattern />

    <main-menu />

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeadPattern from '@/components/HeadPattern'
import MainMenu from '@/components/MainMenu'

export default Vue.extend({
  components: {
    HeadPattern
  }
})
</script>
