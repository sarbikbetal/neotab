<template>
    <div class=" rounded overflow-hidden shadow-lg m-3 bg-white">
      <div class="p-4">
        <i class="handle" />
        <note v-if="type=='note'" :title="title" :body="text"/>
        <todo v-else-if="type=='todo'" :title="title" :body="body"/>
        <bookmark v-else-if="type=='bookmark'" :title="title" :body="body"/>
        <p v-else>Not a note</p>
      </div>
      <div class="px-6 pb-4 pt-1">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
      </div>
    </div>
</template>

<script>
import note from '@/components/Note'
import todo from '@/components/Todo'
import bookmark from '@/components/Bookmark'
export default {
  name: "card",
  props: {
    type: String,
    title: String,
    text: String,
    body: Array,
  },
  components: {
    note,
    todo,
    bookmark
  }
}
</script>

<style>

.handle{
  float: right;
  cursor: move;
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/drag_indicator.svg");
  background-size: 24px 24px;
}
</style>