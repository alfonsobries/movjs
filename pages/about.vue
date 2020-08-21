<template>
  <div class="flex flex-col max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <div class="flex flex-col w-full">
      <div class="flex-grow bg-white">
        <div class="p-6">
          <h1 class="justify-between text-4xl font-semibold text-gray-800">
            About this page
          </h1>

          <p class="mt-4 text-gray-700 sm:mt-0">
            Hi, my name is <strong>Alfonso Bribiesca</strong>, and I create this page as a tech exercise to apply to a job in <strong>LoveToKnow Media</strong>. I hope you enjoy it using it as much as I enjoy working on this.
          </p>
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
        'TypeScript on top of the JS Code',
        'Hosted on Netlify'
      ],
      devtools: [
        'Git for source control',
        'Visual Studio Code IDE',
        'Macbook PRO'
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
