<template>
  <div>
    <p
      @keydown.enter="focusOut"
      @dblclick="makeEditable"
      @blur="updateTitle"
      spellcheck="false"
      class="title font-bold text-xl rounded-sm mr-8 px-1 text-gray-700 appearance-none focus:outline-none focus:bg-gray-200"
    >{{titleData}}</p>
    <p
      @keydown.enter="focusOut"
      @dblclick="makeEditable"
      @blur="updateNote"
      spellcheck="false"
      class="note p-1 mt-1 rounded-sm focus:outline-none focus:bg-gray-200"
    >{{noteData}}</p>
  </div>
</template>

<script>
export default {
  name: "note",
  props: {
    title: String,
    body: String
  },
  data: function() {
    return {
      titleData: this.title,
      noteData: this.body || "Click here to add something.."
    };
  },
  methods: {
    focusOut(e) {
      e.target.blur();
      this.removeEditable(e);
    },
    updateTitle(e) {
      this.titleData = e.target.innerText;
    },
    updateNote(e) {
      this.noteData = e.target.innerText;
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
p {
  transition: all 200ms ease-out;
  text-decoration: none;
}

.note {
  @apply text-gray-600;
  @apply text-base;
  appearance: none;
  border: solid #bebebe52 1px;
}
</style>