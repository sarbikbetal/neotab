<template>
  <div>
    <p
      @keydown.enter="focusOut"
      contenteditable="true"
      class="font-bold text-xl w-auto px-1 text-gray-700 no-underline appearance-none focus:outline-none focus:bg-gray-100"
      type="text"
      spellcheck="false"
      @input="update"
    >{{titleData}}</p>
    <p
      contenteditable="true"
      spellcheck="false"
      class="text-gray-600 p-1 rounded-sm text-base appearance-none focus:outline-none focus:bg-gray-200 w-full"
    >{{noteData}}</p>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    title: String,
    note: String
  },
  data: function() {
    return {
      titleData: this.title,
      noteData: this.note || "Click here to add something.."
    };
  },
  methods: {
    focusOut() {
      document.activeElement.blur();
    },
    update(e) {
      this.noteData = e.target.innerText;
    }
  }
};
</script>

<style scoped>
input {
  transition: all 300ms ease-out;
}
</style>