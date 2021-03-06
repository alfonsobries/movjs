<template>
  <div
    :class="{
      'fixed top-0 right-0 w-screen h-screen overflow-scroll bg-opacity-75 bg-teal-900 m-0 sm:p-20 sm:pt-10 p-5 flex flex-col items-center z-50': hasQuery,
      'relative w-full my-5': !hasQuery
    }"
  >
    <logo v-if="hasQuery" />

    <form
      class="w-full"
      :class="{
        'mt-10 max-w-2xl mx-auto': !useAlt,
        'border-transparent': !hasQuery,
        'border-teal-700': hasQuery
      }"
    >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 block px-3 pointer-events-none sm:px-6">
          <div class="flex flex-row items-center h-full pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-gray-400 transition duration-200 ease-in-out search"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
          </div>
        </div>
        <div class="rounded-lg shadow-lg">
          <div class="rounded-lg shadow-lg">
            <label>
              <input
                ref="input"
                v-model="query"
                class="block w-full pl-12 pr-6 text-gray-100 placeholder-gray-400 transition-all duration-200 ease-in-out bg-gray-700 border-4 rounded-lg shadow-none appearance-none sm:pr-10 sm:pl-20 w-fulltext-xl focus:outline-none focus:shadow-solid-indigo focus:bg-gray-100 focus:text-gray-800 focus:placeholder-gray-500"
                :class="{
                  'py-5 ': !useAlt,
                  'py-3': useAlt,
                  'border-transparent': !hasQuery,
                  'border-teal-700': hasQuery
                }"
                type="text"
                placeholder="Search a movie by title"
                aria-label="Search a movie by title"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
              >
            </label>
          </div>
        </div>
        <div v-if="hasQuery" class="absolute inset-y-0 right-0 flex items-center justify-center pr-5">
          <a class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-opacity-50 hover:bg-red-500" href="#" @click.prevent="query = ''">
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-red-500"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </a>
        </div>
      </div>

      <movie-results-feedback v-if="loadingResults && !results.length">
        <span class="flex">
          <loading-icon class="w-5 h-5 mr-2" />
          Loading results...
        </span>
      </movie-results-feedback>
      <movie-results-feedback v-else-if="errorMessage">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-16 h-16 mb-4 text-teal-200"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Oops! {{ errorMessage }}
      </movie-results-feedback>
      <movie-results-feedback v-else-if="noResults">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-16 h-16 mb-4 text-teal-200"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Unfortunately we could not find any results for your search "{{ query }}". Try a different query
      </movie-results-feedback>
    </form>

    <movie-results
      v-if="results.length"
      :loading="loadingResults"
      :movies="results"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ApiResult, MovieCollection } from '@/types/index'
import MovieResults from '@/components/MovieResults.vue'
import MovieResultsFeedback from '@/components/MovieResultsFeedback.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import Logo from '@/components/Logo.vue'

export default Vue.extend({
  components: {
    MovieResults,
    MovieResultsFeedback,
    LoadingIcon,
    Logo
  },
  props: {
    alt: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const results: MovieCollection = []

    return {
      query: '',
      searchTimeout: -1,
      axiosCancel: this.$axios.CancelToken.source(),
      hasError: false,
      errorMessage: '',
      results,
      totalMatchs: 0,
      busy: false
    }
  },
  computed: {
    useAlt (): boolean {
      return this.alt && !this.hasQuery
    },
    loadingResults () : boolean {
      return !!(this.busy && this.query && !this.results.length)
    },
    noResults () : boolean {
      return !!(this.query && !this.busy && !this.results.length)
    },
    hasQuery (): boolean {
      return !!this.query
    },
    ...mapGetters({
      omdbToken: 'omdbToken'
    })
  },
  watch: {
    '$route' () {
      this.query = ''
    },
    query (query) {
      this.busy = true

      this.hasError = false
      this.errorMessage = ''

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      if (!query) {
        this.totalMatchs = 0
        this.results = []
        return
      }

      this.searchTimeout = window.setTimeout(() => {
        this.doSearch(query)
        this.searchTimeout = -1
      }, 300)
    }
  },
  mounted () {
    document.body.addEventListener('keyup', this.slashKeyHandler)
  },
  beforeDestroy () {
    document.body.removeEventListener('keyup', this.slashKeyHandler)
  },
  methods: {
    doSearch (query: string) :void {
      if (this.axiosCancel) {
        this.axiosCancel.cancel('Canceled for another search')
      }

      this.axiosCancel = this.$axios.CancelToken.source()

      const url = `https://www.omdbapi.com/?apikey=${this.omdbToken}&s=${query}&page=1`
      this.$axios.$get(url, {
        cancelToken: this.axiosCancel.token
      })
        .then((response: ApiResult) => {
          if (response.Response === 'False') {
            this.results = []
            this.totalMatchs = 0
            throw new Error(response.Error)
          }

          this.busy = false

          if (response.Search) {
            this.results = response.Search as MovieCollection
          }
          if (response.totalResults) {
            this.totalMatchs = Number(response.totalResults)
          }
        })
        .catch((error) => {
          if (this.$axios.isCancel(error)) {
            // Request canceled nothing to do
            return
          }

          this.busy = false
          this.hasError = true
          if (error.message) {
            this.errorMessage = error.message
          } else {
            alert('Unexpected error occured')
          }
        })
    },
    slashKeyHandler (e: KeyboardEvent): void {
      if (e.key === '/') {
        const input = this.$refs.input as HTMLInputElement
        input.focus()
        input.select()
      }
    }
  }
})
</script>
