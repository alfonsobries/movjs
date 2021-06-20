<template>
  <div class="max-w-screen-md mx-auto">
    <div class="px-4 sm:px-6 md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
      <div>
        <div class="flex justify-center">
          <logo class="mx-auto " />
        </div>
        <h2 class="mt-4 text-4xl font-extrabold leading-10 tracking-tight text-center text-white sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl">
          Your movie
          <br class="hidden md:inline">
          <span class="text-teal-400">search engine</span>
        </h2>
        <p class="mx-auto mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          MovJs is a <strong>VueJs</strong> powered movie and entertainment search engine for people in a hurry.
        </p>

        <search-form />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/Logo.vue'
import SearchForm from '@/components/SearchForm.vue'

export default Vue.extend({
  layout: 'home',
  components: {
    SearchForm,
    Logo
  },
  head () {
    return {
      title: 'Your movie search engine - MovJS'
    }
  }
})
</script>
