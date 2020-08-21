<template>
  <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <div class="flex-shrink-0 hidden max-w-sm bg-gray-500 shadow-inner sm:block">
      <img :src="movie.Poster" class="w-full" :alt="movie.title">
    </div>
    <div class="flex flex-col w-full">
      <div class="flex-grow p-4 bg-white">
        <h1 class="flex flex-col justify-between text-4xl font-semibold text-gray-800 sm:flex-row">
          <span>
            {{ movie.Title }}
          </span>
          <movie-rating
            big
            :rating="parseFloat(movie.imdbRating)"
            :votes="movie.imdbVotes"
          />
        </h1>

        <p class="mt-4 text-gray-700 sm:mt-0">
          {{ movie.Plot }}
        </p>

        <div class="flex-shrink-0 max-w-sm mt-4 bg-gray-500 shadow-inner sm:hidden">
          <img :src="movie.Poster" class="w-full" :alt="movie.title">
        </div>

        <ul class="flex flex-wrap my-4 text-sm text-gray-500 capitalize">
          <li class="pr-2">
            {{ movie.Rated }}
          </li>
          <li class="px-2 border-l">
            {{ movie.Year }}
          </li>
          <li class="px-2 border-l">
            {{ movie.Type }} - {{ movie.Genre }}
          </li>
          <li class="px-2 border-l">
            {{ movie.Runtime }}
          </li>
        </ul>

        <p>
          <strong class="text-gray-700">Actors:</strong> <span class="text-gray-600">{{ movie.Actors }}</span>
        </p>
        <p>
          <strong class="text-gray-700">Director:</strong> <span class="text-gray-600">{{ movie.Director }}</span>
        </p>
        <p>
          <strong class="text-gray-700">Writer:</strong> <span class="text-gray-600">{{ movie.Writer }}</span>
        </p>
      </div>

      <div class="p-4 bg-gray-200">
        <ul>
          <li
            v-for="(detail, index) in details"
            :key="index"
            class="flex items-center text-sm text-gray-700"
          >
            <span class="inline-block w-1 h-1 mx-4 bg-teal-500 rounded-full" /> {{ detail }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MovieDetails } from '@/types/index'
import MovieRating from '@/components/MovieRating.vue'
export default Vue.extend({
  components: {
    MovieRating
  },
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
  computed: {
    details (): string[] {
      const movie = (this as unknown as { movie: MovieDetails }).movie
      type movieParam = keyof MovieDetails
      const loopableParams: movieParam[] = [
        'Awards',
        'BoxOffice',
        'Country',
        'DVD',
        'Metascore',
        'Production',
        'Released',
        'Language',
        'Website'
      ]

      return loopableParams
        .filter(param => !!movie[param])
        .map((param) => {
          return `${param}: ${movie[param]}`
        }) as string[]
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
