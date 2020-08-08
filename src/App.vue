<template>
  <div @contextmenu="$event.preventDefault()" id="app">
    <newtab />
  </div>
</template>

<script>
import newtab from "@/views/NewTab.vue";

export default {
  name: "App",
  components: {
    newtab,
  },
  mounted: function () {
    console.log("Paste filter registered");
    document.querySelector("#app").addEventListener("paste", function (e) {
      let tag = e.target.tagName.toLowerCase();
      try {
        if (
          tag == "textarea" ||
          (tag == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
            typeof activeEl.selectionStart == "number")
        ) {
          return;
        }
        e.preventDefault();
        if (e.clipboardData && e.clipboardData.getData) {
          var text = e.clipboardData.getData("text/plain");
          document.execCommand("insertHTML", false, text);
        } else if (window.clipboardData && window.clipboardData.getData) {
          var text = window.clipboardData.getData("Text");
          insertTextAtCursor(text);
        }
      } catch (error) {
      }
    });
  },
};
</script>

<style>
:root {
  /* Simple Dark */
  --header-bg-color: #212121;
  --primary: #323232;
  --primary-light: #353535;
  --secondary: #f687b3;
  --board: #121212;
  --accent: #81e6d9;
  --accent-light: #b2f5ea;
  --link: #b2f5ea;
  --text-strong: #d6d6d6;
  --text: #c4c4c4;
  --text-light: #838383;

  color: var(--text);
}

html {
  scroll-behavior: smooth;
  background-color: var(--header-bg-color);
}

#app {
  @apply font-sans;
}

.favicon {
  margin: 4px 0;
  height: 20px;
  width: 20px;
}
::selection {
  color: var(--text-strong);
  background: var(--accent);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #a7a7a71e;
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

