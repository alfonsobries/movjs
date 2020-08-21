<template>
  <span class="flex items-center ">
    <svg
      v-for="i in loopableFilledStars"
      :key="`${i}-filled`"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="text-indigo-500"
      :class="{
        'w-6 h-6': big,
        'w-4 h-4': !big,
      }"
    ><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>

    <svg
      v-for="i in loopableunfilledStars"
      :key="`${i}-unfilled`"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="text-indigo-500"
      :class="{
        'w-6 h-6': big,
        'w-4 h-4': !big,
      }"
    ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>

    <span class="hidden ml-1 text-xs text-gray-600 sm:block">{{ votes }} votes</span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    big: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      required: true
    },
    votes: {
      type: String,
      required: true
    }
  },
  computed: {
    filledStars (): number {
      return Math.round(this.rating / 2)
    },
    loopableFilledStars (): number[] {
      return Array.from({ length: this.filledStars }, (_x, i) => i)
    },
    loopableunfilledStars (): number[] {
      return Array.from({ length: this.unfilledStars }, (_x, i) => i)
    },
    unfilledStars (): number {
      return 5 - this.filledStars
    }
  }

})
</script>
