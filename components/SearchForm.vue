<template>
  <form
    :class="{
      'fixed top-0 right-0 w-screen h-screen overflow-scroll bg-opacity-75 bg-teal-900 m-0 sm:p-20 p-5': hasQuery,
      'relative w-full my-5': !hasQuery
    }"
  >
    <div class="relative">
      <div class="absolute inset-y-0 left-0 block px-6 pointer-events-none">
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
              class="block w-full py-5 pl-20 pr-10 text-xl text-gray-100 placeholder-gray-400 transition-all duration-200 ease-in-out bg-gray-700 border-4 rounded-lg shadow-none appearance-none focus:outline-none focus:shadow-solid-indigo focus:bg-gray-100 focus:text-gray-800 focus:placeholder-gray-500 "
              :class="{
                'border-transparent': !hasQuery,
                'border-teal-700': hasQuery
              }"
              type="text"
              placeholder="Search a movie by title (&quot;/&quot; to focus)"
              aria-label="Search a movie by title"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            >
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      query: ''
    }
  },
  computed: {
    hasQuery (): boolean {
      return !!this.query
    }
  },
  watch: {
    query (query) {
      console.log(query)
    }
  },
  mounted () {
    document.body.addEventListener('keyup', this.slashKeyHandler)
  },
  beforeDestroy () {
    document.body.removeEventListener('keyup', this.slashKeyHandler)
  },
  methods: {
    slashKeyHandler (e: KeyboardEvent) {
      if (e.key === '/') {
        const input = this.$refs.input as HTMLInputElement
        input.focus()
        input.select()
      }
    }
  }
})
</script>
