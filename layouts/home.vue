<template>
  <div class="relative min-h-screen overflow-hidden bg-gray-800 sm:items-center sm:justify-center sm:flex sm:h-screen">
    <head-pattern />

    <div class="relative pt-6 pb-12 sm:pb-32">
      <main class="mt-8 sm:mt-16 md:mt-20 lg:mt-24">
        <nuxt />
      </main>

      <legals />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeadPattern from '@/components/HeadPattern'
import Legals from '@/components/Legals'

export default Vue.extend({
  components: {
    HeadPattern,
    Legals
  }
})
</script>
