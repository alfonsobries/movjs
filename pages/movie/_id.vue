<template>
  <div>
    <div class="max-w-screen-md mx-auto">
      <p>lorem</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MovieDetails } from '@/types/index'

export default Vue.extend({
  layout: 'content',
  async asyncData ({ route, error, store, $axios }) {
    const omdbToken = store.getters.omdbToken
    const movieId = route.params.id
    const url = `https://www.omdbapi.com/?apikey=${omdbToken}&i=${movieId}`
    try {
      const movie: MovieDetails = await $axios.$get(url)
      return {
        movie
      }
    } catch (throwError) {
      if (throwError.message) {
        error(throwError.message)
      } else {
        error(new Error('Unexpected error occured'))
      }
    }
  },
  head () {
    const movie = (this as unknown as { movie: MovieDetails }).movie
    return {
      title: `${movie.Title} - MovJS`
    }
  }
})
</script>
