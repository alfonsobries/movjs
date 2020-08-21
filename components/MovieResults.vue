<template>
  <div class="grid max-w-6xl grid-flow-row gap-6 mx-auto mt-10 xl:grid-cols-2">
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
    movies: {
      type: Array,
      required: true
    }
  }
})
</script>
