<template>
  <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <div class="flex-shrink-0 bg-gray-500 shadow-inner">
      <img :src="movie.Poster" class="w-full sm:w-40" :alt="movie.title">
    </div>
    <div class="flex flex-col w-full">
      <div class="flex-grow p-4">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ movie.Title }}
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
      <div v-else class="p-4 bg-gray-200">
        <p class="hidden max-w-xs mb-3 text-sm text-gray-600 truncate sm:block">
          {{ movieDetails.Actors }}
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
            <button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700">
              View more
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { MovieDetails } from '@/types/index'
import MovieRating from './MovieRating'
import MovieDetailsPlaceholder from './MovieDetailsPlaceholder'
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
      expandPlot: false
    }
  },
  computed: {
    ...mapGetters({
      omdbToken: 'omdbToken'
    }),
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
          alert('Unexpected error occured')
        })
    }
  }
})
</script>
