<template>
  <textarea
    @keydown.esc="focusOut"
    @blur="updateNote"
    @contextmenu="$event.stopPropagation()"
    spellcheck="false"
    class="note p-1 mt-1 rounded-sm w-full"
    role="textbox"
    rows="5"
    :value="noteData"
  />
</template>

<script>
export default {
  name: "note",
  props: {
    cardId: Number,
    body: String,
  },
  computed: {
    noteData() {
      return this.body;
    },
  },
  methods: {
    focusOut(e) {
      e.target.blur();
    },
    updateNote(e) {
      this.$store.commit("updateNote", {
        id: this.cardId,
        note: e.target.value.trim(),
      });
    },
  },
};
</script>

<style scoped>
.note {
  color: var(--text);
  background-color: var(--header);
  @apply text-base;
  @apply break-all;
  white-space: pre-line;
  white-space: pre-wrap;
  min-height: 34px;
  appearance: none;
  border: none;
}
.note:focus{
  outline: none;
  background-color: var(--primary);
}

</style>