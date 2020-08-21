<template>
  <nav class="bg-gray-800">
    <div class="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between ">
        <div class="flex flex-col items-center w-full px-2 pt-5 lg:px-0 sm:flex-row sm:pt-0">
          <div class="flex-shrink-0">
            <Logo />
          </div>
          <div class="flex justify-center flex-1 w-full px-2 lg:ml-6 lg:justify-end">
            <search-form alt />
            <!-- <div class="w-full ">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="search" class="block w-full py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 transition duration-150 ease-in-out bg-gray-700 border border-transparent rounded-md focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm" placeholder="Search" type="search">
              </div>
            </div> -->
          </div>
          <div class="hidden lg:block lg:ml-6">
            <div class="flex">
              <nuxt-link
                class="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                exact-active-class="text-white bg-gray-900"
                to="/"
              >
                Home
              </nuxt-link>
              <nuxt-link
                class="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                exact-active-class="text-white bg-gray-900"
                to="/about"
              >
                About
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/Logo'
import SearchForm from '@/components/SearchForm'

export default Vue.extend({
  components: {
    SearchForm,
    Logo
  }
})
</script>
