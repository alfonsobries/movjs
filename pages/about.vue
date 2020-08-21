<template>
  <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow sm:flex-row">
    <div class="flex flex-col w-full">
      <div class="flex-grow p-4 bg-white">
        <h1 class="justify-between text-4xl font-semibold text-gray-800">
          About this page
        </h1>

        <p class="mt-4 text-gray-700 sm:mt-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium iusto maiores commodi similique aperiam omnis ullam doloremque soluta natus, fugiat odit beatae officiis doloribus totam magni fuga excepturi vel.
        </p>

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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head () {
    return {
      title: 'About - MovJS'
    }
  }
})
</script>
