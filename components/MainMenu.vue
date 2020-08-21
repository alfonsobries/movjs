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
import Logo from '@/components/Logo.vue'
import SearchForm from '@/components/SearchForm.vue'

export default Vue.extend({
  components: {
    SearchForm,
    Logo
  }
})
</script>
