<template>
    <div class=" rounded overflow-hidden shadow-lg m-3 bg-white">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The <slot /></div>
        <p class="text-gray-700 text-base">
          <slot />
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
      </div>
    </div>
</template>

<script>
export default {
name: "card"
}
</script>

<style>
</style>