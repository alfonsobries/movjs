<template>
  <form class="relative w-full my-5">
    <div class="absolute inset-y-0 left-0 block px-6 pointer-events-none">
      <div class="flex flex-row items-center h-full pl-2">
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-gray-400 transition duration-200 ease-in-out search"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
      </div>
    </div>
    <div class="rounded-lg shadow-lg">
      <div class="rounded-lg shadow-lg">
        <label>
          <input
            class="block w-full py-5 pl-20 pr-10 text-xl text-gray-100 placeholder-gray-400 transition duration-200 ease-in-out bg-gray-700 rounded-lg shadow-none appearance-none focus:outline-none focus:shadow-solid-indigo focus:bg-gray-100 focus:text-gray-800 focus:placeholder-gray-500"
            type="text"
            placeholder="Search a movie by title"
            aria-label="Search a movie by title"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            value=""
          >
        </label>
      </div>
    </div>
  </form>
</template>
