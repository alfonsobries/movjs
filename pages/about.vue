<template>
  <div class="flex flex-col max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <div class="flex flex-col w-full">
      <div class="flex-grow bg-white">
        <div class="p-6">
          <h1 class="justify-between text-4xl font-semibold text-gray-800">
            About this page
          </h1>
        </div>

        <div class="p-4 bg-gray-200">
          <p class="text-2xl font-semibold text-gray-700">
            Tech stack
          </p>
          <ul class="mb-4">
            <li
              v-for="(detail, index) in techs"
              :key="index"
              class="flex items-center text-gray-700"
            >
              <span class="inline-block w-1 h-1 mx-4 bg-teal-500 rounded-full" /> {{ detail }}
            </li>
          </ul>
          <p class="mt-4 text-2xl font-semibold text-gray-700">
            Development powered by
          </p>
          <ul class="mb-4">
            <li
              v-for="(detail, index) in devtools"
              :key="index"
              class="flex items-center text-gray-700"
            >
              <span class="inline-block w-1 h-1 mx-4 bg-teal-500 rounded-full" /> {{ detail }}
            </li>
          </ul>

          <p class="mt-4 text-2xl font-semibold text-gray-700">
            Made with care
          </p>
          <p class="text-gray-700">
            Even that is just a demo and small project I care about performance and best practices.
          </p>
          <img class="mt-2 rounded-lg shadow" src="@/assets/img/performance.png" alt="I care about performance">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      techs: [
        'NuxtJS for the page navigation',
        'VueJS for the components',
        'TailwindCSS for styling',
        'TypeScript on top of the JS Code',
        'Hosted as an SSR app on Vercel'
      ],
      devtools: [
        'Git for source control',
        'Visual Studio Code IDE',
        'Macbook Pro'
      ]
    }
  },
  head () {
    return {
      title: 'About - MovJS'
    }
  }
})
</script>
