<template>
  <div class="pt-2">
    <draggable
      v-model="links"
      group="links"
      @start="drag=true"
      @end="drag=false"
      ghost-class="link-ghost"
      handle=".favicon"
    >
      <transition-group name="link" tag="div">
        <div
          class="flex items-center"
          @dblclick="editBookmark($event, link)"
          v-for="link in links"
          :key="link.id"
        >
          <img
            class="favicon ml-1 select-none inline"
            :src="getFavicon(link.url)"
            @error="loadDefault($event, link.url)"
          />
          <div class="flex-1 pl-2">
            <a
              @contextmenu="$event.stopPropagation()"
              class="link hover:underline"
              :href="link.url"
              target="_blank"
            >{{link.title}}</a>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div v-if="editing" class="form-group text-right" @keydown.esc="toggleForm">
      <div class="md:flex md:items-center content-start my-2">
        <label class="bkmrk-label">Title</label>
        <input
          v-model="bkmTitle"
          class="md:flex-1 bkmrk-field focus:outline-none"
          type="text"
          @keydown.enter="focusNextField"
        />
      </div>
      <div class="md:flex md:items-center content-start my-2">
        <label class="bkmrk-label">URL</label>
        <input
          v-model="bkmURL"
          class="md:flex-1 bkmrk-field focus:outline-none"
          type="url"
          @keydown.enter="toggleForm"
        />
      </div>
      <button @click="deleteBookmark" v-if="bkmId" class="remove-bookmark">
        <div class="bg"></div>
      </button>
    </div>
    <div class="text-center h-8 pt-3">
      <button @click="toggleForm" class="add-bookmark">
        <svg class="add-todo-btn select-none" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill="var(--text-light)"
            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getFavicon, loadDefault } from "../services/favicon";
export default {
  name: "bookmark",
  components: {
    draggable,
  },
  props: {
    cardId: Number,
    body: Array,
  },
  data: function () {
    return {
      editing: false,
      bkmTitle: "",
      bkmURL: "",
      bkmId: undefined,
    };
  },
  computed: {
    links: {
      get() {
        return this.body;
      },
      set(list) {
        this.$store.commit("reorderBookmark", {
          id: this.cardId,
          bkmList: list,
        });
      },
    },
  },
  methods: {
    getFavicon,
    loadDefault,
    toggleForm(e) {
      e.target.blur();
      if (this.editing) {
        this.addBookmark(this.bkmTitle, this.bkmURL);
        this.bkmTitle = "";
        this.bkmURL = "";
      }
      this.editing = !this.editing;
    },
    focusNextField(e) {
      e.target.parentElement.nextSibling.lastChild.focus();
    },
    addBookmark(title, url) {
      if (url.length != 0 && title.length != 0) {
        let siteUrl = url;
        try {
          siteUrl = new URL(url).href;
        } catch (error) {
          siteUrl = "http://" + url;
        }
        if (this.bkmId) {
          this.$store.commit("updateBookmark", {
            id: this.cardId,
            bkmId: this.bkmId,
            title,
            url: siteUrl,
          });
          this.bkmId = undefined;
        } else
          this.$store.commit("addBookmark", {
            id: this.cardId,
            title,
            url: siteUrl,
          });
      }
    },
    editBookmark(e, link) {
      e.stopPropagation();
      this.bkmTitle = link.title;
      this.bkmURL = link.url;
      this.bkmId = link.id;

      this.toggleForm(e);
    },
    deleteBookmark(e) {
      this.$store.commit("deleteBookmark", {
        id: this.cardId,
        bkmId: this.bkmId,
      });
      this.bkmTitle = "";
      this.bkmURL = "";
      this.bkmId = undefined;
      this.editing = false;
    },
  },
};
</script>

<style>
.add-bookmark {
  @apply rounded-full;
  @apply opacity-75;
  height: 24px;
  width: 24px;
  background-color: var(--primary);
  transition: all 200ms ease-in;
}
.add-bookmark:hover {
  @apply shadow;
  opacity: 1;
  background-color: var(--primary-light);
}
.add-bookmark:focus {
  outline: none;
  opacity: 1;
  background-color: var(--primary-light);
}
.remove-bookmark {
  @apply rounded-full;
  @apply opacity-50;
  background-color: var(--primary);
  height: 28px;
  width: 28px;
  padding: 2px;
  transition: all 200ms ease-in;
}
.remove-bookmark:hover {
  @apply shadow;
  opacity: 0.75;
  background-color: var(--primary-light);
}
.remove-bookmark:focus {
  outline: none;
  opacity: 0.75;
  background-color: var(--primary-light);
}
.remove-bookmark .bg {
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/delete.svg");
  background-size: 24px 24px;
}

.bkmrk-label {
  @apply block;
  color: var(--text-strong);
  @apply text-left;
  @apply pr-2;
  min-width: 48px;
}
.bkmrk-field {
  background-color: var(--primary);
  color: var(--text);
  @apply appearance-none;
  @apply rounded;
  @apply w-full;
  @apply min-w-0;
  @apply py-1;
  @apply px-2;
  @apply leading-tight;
}
.form-group {
  @apply rounded;
  @apply mt-2;
  @apply px-2;
  border: solid #bebebe52 1px;
}
.link {
  @apply pl-1;
  @apply text-base;
  color: var(--link);
}
.link-enter-active,
.link-leave-active {
  transition: all 0.3s;
}
.link-enter {
  opacity: 0.1;
}
.link-leave-to {
  opacity: 0;
}
.link-leave {
  opacity: 1;
}
.link-move {
  transition: transform 0.2s;
}

.link-ghost {
  opacity: 0.2;
}
</style>