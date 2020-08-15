<template>
  <div @click="hideMenu">
    <navigation />
    <favBar @contextmenu.native="showMenu" />
    <board @contextmenu.native="showMenu" />
    <contextMenu :show="menuVisible" :cardId="focusedCard" :text="selectedText" />
  </div>
</template>

<script>
import navigation from "@/components/NavBar";
import board from "@/components/Board";
import favBar from "@/components/FavBar";
import contextMenu from "@/components/ContextMenu";

export default {
  name: "newtab",
  components: {
    navigation,
    board,
    favBar,
    contextMenu,
  },
  data: function () {
    return {
      menuVisible: false,
      focusedCard: undefined,
      selectedText: undefined,
    };
  },
  methods: {
    showMenu(e) {
      e.preventDefault();
      const origin = {
        left: e.pageX,
        top: e.pageY,
      };

      let levels = 3;
      let target = e.target;
      this.focusedCard = undefined;
      while (levels--) {
        if (target.hasAttribute("card")) {
          this.focusedCard = parseInt(target.getAttribute("card"));
          break;
        } else target = target.parentElement;
      }

      this.setPosition(origin);
      this.selectedText = this.copyText();
    },
    setPosition({ top, left }) {
      console.log(top, left);
      const menu = document.querySelector(".menu");
      // menu.style.left = `${left}px`;
      // menu.style.top = `${top}px`;

      let menuWidth = menu.offsetWidth + 4;
      let menuHeight = menu.offsetHeight + 4;

      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      if (windowWidth - left < menuWidth) {
        menu.style.left = windowWidth - menuWidth + "px";
      } else {
        menu.style.left = left + "px";
      }

      if (windowHeight - top < menuHeight) {
        menu.style.top = windowHeight - menuHeight + "px";
      } else {
        menu.style.top = top + "px";
      }

      this.menuVisible = true;
    },
    hideMenu() {
      this.menuVisible = false;
    },
    copyText() {
      let text = "";
      let activeEl = document.activeElement;
      let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
      if (
        activeElTagName == "textarea" ||
        (activeElTagName == "input" &&
          /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
          typeof activeEl.selectionStart == "number")
      ) {
        text = activeEl.value.slice(
          activeEl.selectionStart,
          activeEl.selectionEnd
        );
      } else if (window.getSelection) {
        text = window.getSelection().toString();
      }
      return text;
    },
  },
  beforeCreate() {
    const stateString = window.localStorage.getItem("app-state");
    const oldState = JSON.parse(stateString);

    if (oldState) {
      this.$store.commit("initialiseStore", oldState);
    }
  },
};
</script>

<style>
</style>