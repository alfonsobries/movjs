<template>
  <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <nuxt-link :disabled="isInMoviePage" :to="`/movie/${movie.imdbID}`" class="flex-shrink-0 bg-gray-500 shadow-inner">
      <img :src="movie.Poster" class="w-full sm:w-40" :alt="movie.title">
    </nuxt-link>
    <div class="flex flex-col w-full">
      <div class="flex-grow p-4">
        <h3 class="text-lg font-semibold text-gray-800">
          <nuxt-link v-if="!isInMoviePage" :to="`/movie/${movie.imdbID}`" class="hover:text-gray-700">
            {{ movie.Title }}
          </nuxt-link>
          <span v-else>
            {{ movie.Title }}
          </span>
        </h3>
        <template v-if="movieDetails">
          <p v-if="!expandPlot" class="text-sm leading-snug text-gray-700">
            {{ plotExcerpt }}
            <a v-if="plotHasMore" href="#" class="text-sm text-teal-500" @click.prevent="expandPlot = true">[more...]</a>
          </p>
          <p v-else class="text-sm leading-snug text-gray-700">
            {{ movieDetails.Plot }}
          </p>
        </template>
      </div>
      <movie-details-placeholder v-if="!movieDetails" />
      <div v-else-if="errorMessage" class="p-4 bg-gray-200">
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 text-gray-400 puzzle"><path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" /></svg>
        <span class="text-gray-600">{{ errorMessage }}</span>
      </div>
      <div v-else class="p-4 bg-gray-200">
        <p class="mb-3 text-sm text-gray-600">
          <strong>Director:</strong> {{ movieDetails.Director }}
        </p>
        <div class="flex flex-col justify-between sm:flex-row">
          <div>
            <strong>{{ movieDetails.Year }}</strong>
            <movie-rating
              :rating="parseFloat(movieDetails.imdbRating)"
              :votes="movieDetails.imdbVotes"
            />
          </div>

          <span class="inline-flex mt-4 rounded-md shadow-sm sm:mt-0">
            <nuxt-link
              :to="`/movie/${movie.imdbID}`"
              type="button"
              :class="{
                'hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700': !isInMoviePage,
                'opacity-50 cursor-not-allowed': isInMoviePage,
              }"
              class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md "
              :disabled="isInMoviePage"
            >
              View more
            </nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { MovieDetails, Movie } from '@/types/index'
import MovieRating from '@/components/MovieRating.vue'
import MovieDetailsPlaceholder from './MovieDetailsPlaceholder.vue'
export default Vue.extend({
  components: {
    MovieRating,
    MovieDetailsPlaceholder
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      axiosCancel: this.$axios.CancelToken.source(),
      loadingDetails: false,
      movieDetails: null as MovieDetails | null,
      expandPlot: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      omdbToken: 'omdbToken'
    }),
    isInMoviePage (): boolean {
      const movie: Movie = (this as unknown as { movie: Movie }).movie
      return !!(this.$route.params.id && this.$route.params.id === movie.imdbID)
    },
    plotHasMore (): boolean {
      return (!!this.movieDetails) && this.movieDetails.Plot.length > this.plotExcerpt.length
    },
    plotExcerpt (): string {
      if (!this.movieDetails) {
        return ''
      }
      return this.movieDetails.Plot.substr(0, 120)
    }
  },
  created () {
    this.loadMovieDetails()
  },
  beforeDestroy () {
    if (this.axiosCancel) {
      this.axiosCancel.cancel('Canceled for another search')
    }
  },
  methods: {
    loadMovieDetails () {
      if (this.axiosCancel) {
        this.axiosCancel.cancel('Canceled for another search')
      }

      this.loadingDetails = true
      this.axiosCancel = this.$axios.CancelToken.source()
      const url = `https://www.omdbapi.com/?apikey=${this.omdbToken}&i=${this.movie.imdbID}&page=1`
      this.$axios.$get(url)
        .then((response: MovieDetails) => {
          this.movieDetails = response
          this.loadingDetails = false
        })
        .catch((error) => {
          if (this.$axios.isCancel(error)) {
            // Request canceled nothing to do
            return
          }

          this.loadingDetails = false
          if (error.message) {
            this.errorMessage = error.message
          } else {
            alert('Unexpected error occured')
          }
        })
    }
  }
})
</script>
