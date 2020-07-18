<template>
  <div>
    <p
      @keydown.enter="focusOut"
      @dblclick="makeEditable"
      @blur="updateNote"
      spellcheck="false"
      class="note p-1 mt-1 rounded-sm focus:outline-none focus:bg-gray-200"
    >{{body}}</p>
  </div>
</template>

<script>
export default {
  name: "note",
  props: {
    cardId: Number,
    body: String
  },
  computed: {
    noteData() {
      return this.body;
    }
  },
  methods: {
    focusOut(e) {
      e.target.blur();
    },
    updateNote(e) {
      this.removeEditable(e);
      this.$store.commit("updateNote", {
        id: this.cardId,
        note: e.target.innerText
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
.note {
  @apply text-gray-600;
  @apply text-base;
  min-height: 34px;
  appearance: none;
  border: solid #bebebe52 1px;
}
</style>