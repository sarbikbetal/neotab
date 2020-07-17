<template>
  <div id="app">
    <newtab msg="hello" />
  </div>
</template>

<script>
import newtab from "@/views/NewTab.vue";

export default {
  name: "App",
  components: {
    newtab
  },
  mounted: function() {
    console.log("Paste filter registered");
    document.querySelector("#app").addEventListener("paste", function(e) {
      e.preventDefault();
      if (e.clipboardData && e.clipboardData.getData) {
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        var text = window.clipboardData.getData("Text");
        insertTextAtCursor(text);
      }
    });
  }
};
</script>

<style>
#app {
  @apply font-sans;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #a7a7a77c;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac85;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #424242d8;
}
</style>

