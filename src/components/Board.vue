<template>
  <div @contextmenu="showMenu" @click="hideMenu" class="board flex flex-col md:flex-row mb-2">
    <column v-for="(col, i) in columns" :key="col">
      <draggable
        v-model="data[i]"
        @input="reorderTodo($event, i)"
        group="columns"
        @start="drag=true"
        @end="drag=false"
        class="h-full"
        ghost-class="card-ghost"
        handle=".handle"
      >
        <transition-group name="list" tag="div" class="h-full">
          <card
            v-for="element in data[i]"
            :key="element.id"
            :cardId="element.id"
            :type="element.type"
            :title="element.title"
            :text="element.text"
            :body="element.body"
            :card="element.id"
          />
        </transition-group>
      </draggable>
    </column>
    <contextMenu :show="menuVisible" :cardId="focusedCard" :text="selectedText" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import column from "@/components/Column";
import card from "@/components/Card";
import contextMenu from "@/components/ContextMenu";
import { mapState } from "vuex";

export default {
  name: "board",
  components: {
    draggable,
    column,
    card,
    contextMenu,
  },
  data: function () {
    return {
      menuVisible: false,
      focusedCard: undefined,
      selectedText: undefined,
    };
  },
  computed: {
    ...mapState({
      data: "cardData",
      columns: "columns",
    }),
  },
  methods: {
    reorderTodo(list, col) {
      this.$store.commit("reorderCards", { list, col });
    },
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
};
</script>

<style>
.board {
  background: var(--board);
}
.list-enter-active {
  transition: all 0.3s;
}
.list-enter {
  opacity: 0.1;
}
.list-leave-to,
.list-leave {
  opacity: 0;
}
.list-move {
  transition: transform 0.2s;
}
.card-ghost {
  height: 48px;
  background: #9e9e9e;
  opacity: 0;
}
</style>