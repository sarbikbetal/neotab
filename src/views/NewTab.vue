<template>
  <div @click="hideMenu">
    <navigation />
    <favBar @contextmenu.native="showMenu" v-bind="fav" />
    <board @contextmenu.native="showMenu" />
    <contextMenu
      :show="menuVisible"
      :options="contextMenuOptions"
      :position="position"
      @Delete="deleteHandler"
      @Edit="editHandler"
      @Copy="copyToClipboard"
    />
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
      focusedItem: {
        type: "",
        id: "",
      },
      selectedText: undefined,
      position: {
        top: 0,
        left: 0,
      },
      contextMenuOptions: {
        Copy: false,
        Edit: false,
        Delete: false,
      },
      fav: {
        open: false,
        url: "",
      },
    };
  },
  methods: {
    deleteHandler() {
      if (this.focusedItem.type == "card")
        this.$store.commit("deleteCard", {
          id: this.focusedItem.id,
        });
      else if (this.focusedItem.type == "fav") {
        this.fav.url = "";
        this.fav.open = false;
        this.$store.commit("deleteFav", this.focusedItem.id);
      }
    },
    editHandler() {
      if (this.focusedItem.type == "fav") {
        this.fav.open = true;
        this.$store.commit("deleteFav", this.focusedItem.id);
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.selectedText);
    },
    showMenu(e) {
      e.preventDefault();

      this.focusedItem = { type: "", id: "" };
      this.contextMenuOptions.Delete = false;
      this.selectedText = this.copyText();
      this.contextMenuOptions.Copy = this.selectedText ? true : false;
      this.fav.open = false;
      this.fav.url = "";

      let levels = 3;
      let target = e.target;
      while (levels--) {
        if (target.hasAttribute("card")) {
          this.focusedItem.type = "card";
          this.focusedItem.id = parseInt(target.getAttribute("card"));
          this.contextMenuOptions.Delete = true;
          break;
        } else if (target.hasAttribute("fav")) {
          this.focusedItem.type = "fav";
          this.focusedItem.id = parseInt(target.getAttribute("fav"));
          this.fav.url = target.getAttribute("href");
          this.contextMenuOptions.Delete = true;
          this.contextMenuOptions.Edit = true;
          break;
        } else target = target.parentElement;
      }

      this.position = { top: e.pageY, left: e.pageX };
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