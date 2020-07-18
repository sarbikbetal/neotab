<template>
  <div class="rounded overflow-hidden shadow-lg m-3 bg-white">
    <div class="p-4">
      <i class="handle opacity-25 hover:opacity-100" />
      <p
        @keydown.enter="focusOut"
        @dblclick="makeEditable"
        @blur="updateTitle"
        spellcheck="false"
        class="title font-bold text-xl rounded-sm mr-8 px-1 text-gray-700 appearance-none focus:outline-none focus:bg-gray-200"
      >{{title}}</p>
      <note v-if="type=='note'" :body="text" :cardId="cardId" />
      <todo v-else-if="type=='todo'" :body="body" :cardId="cardId" />
      <bookmark v-else-if="type=='bookmark'" :body="body" :cardId="cardId" />
      <p v-else>Not a note</p>
    </div>
    <div class="px-6 pb-4 pt-1">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >#photography</span>
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >#travel</span>
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
      >#winter</span>
    </div>
  </div>
</template>

<script>
import note from "@/components/Note";
import todo from "@/components/Todo";
import bookmark from "@/components/Bookmark";
export default {
  name: "card",
  props: {
    cardId: Number,
    type: String,
    title: String,
    text: String,
    body: Array
  },
  components: {
    note,
    todo,
    bookmark
  },
  methods: {
    focusOut(e) {
      e.target.blur();
    },
    updateTitle(e) {
      this.removeEditable(e);
      this.$store.commit("updateTitle", {
        id: this.cardId,
        title: e.target.innerText
      });
    },
    makeEditable(e) {
      e.target.contentEditable = true;
      e.target.focus();
    },
    removeEditable(e) {
      e.target.contentEditable = false;
    }
  }
};
</script>

<style scoped>
.handle {
  float: right;
  cursor: move;
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/drag_indicator.svg");
  background-size: 24px 24px;
}

p.title {
  transition: all 200ms ease-out;
  text-decoration: none;
}
</style>