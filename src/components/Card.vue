<template>
    <div class=" rounded overflow-hidden shadow-lg m-3 bg-white">
      <div class="p-4">
        <note v-if="type=='note'" :title="title" :note="body"/>
        <p v-else>Not a note</p>
      </div>
      <div class="px-6 py-4">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
      </div>
    </div>
</template>

<script>
import note from '@/components/Note'
export default {
  name: "card",
  props: {
    type: String,
    title: String,
    body: String,
  },
  components: {
    note
  }
}
</script>

<style>
</style>