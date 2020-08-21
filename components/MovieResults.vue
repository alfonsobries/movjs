<template>
  <div class="relative grid w-full max-w-6xl grid-flow-row gap-6 mx-auto mt-10 xl:grid-cols-2">
    <div v-if="loading" class="absolute z-10 flex justify-center w-full h-full p-10 text-2xl text-gray-800 bg-white bg-opacity-75 rounded-lg">
      <loading-icon class="w-5 h-5 mr-2" />
      Loading results...
    </div>
    <movie-card v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MovieCard from './MovieCard'

export default Vue.extend({
  components: {
    MovieCard
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    movies: {
      type: Array,
      required: true
    }
  }
})
</script>
