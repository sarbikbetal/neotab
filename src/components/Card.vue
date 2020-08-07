<template>
  <div class="card rounded shadow-lg m-2 my-4" :class="type=='todo' ? 'mb-8' : ''">
    <div class="p-4">
      <i class="handle opacity-25 hover:opacity-100" />
      <p
        @keydown.enter="focusOut"
        @dblclick="makeEditable"
        @blur="updateTitle"
        spellcheck="false"
        class="card-title font-bold rounded-sm mr-8 px-1 appearance-none"
      >{{title}}</p>
      <note v-if="type=='note'" :body="text" :cardId="cardId" />
      <todo v-else-if="type=='todo'" :body="body" :cardId="cardId" />
      <bookmark v-else-if="type=='bookmark'" :body="body" :cardId="cardId" />
      <p v-else>Not a note</p>
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
    body: Array,
  },
  components: {
    note,
    todo,
    bookmark,
  },
  methods: {
    focusOut(e) {
      e.target.blur();
    },
    updateTitle(e) {
      this.removeEditable(e);
      this.$store.commit("updateTitle", {
        id: this.cardId,
        title: e.target.innerText,
      });
    },
    makeEditable(e) {
      e.target.contentEditable = true;
      e.target.focus();
    },
    removeEditable(e) {
      e.target.contentEditable = false;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--header-bg-color);
}
.handle {
  float: right;
  cursor: move;
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/drag_indicator.svg");
  background-size: 24px 24px;
}

.card-title {
  font-size: 1.15rem;
  color: var(--text-strong);
  transition: all 200ms ease-out;
  text-decoration: none;
}
.card-title:focus {
  outline: none;
  background-color: var(--primary);
}
</style>