<template>
  <div>
    <draggable
      v-model="links"
      group="links"
      @start="drag=true"
      @end="drag=false"
      handle=".favicon"
      ghost-class="link-ghost"
    >
      <transition-group name="link" tag="div">
        <div @dblclick="editBookmark($event, link)" v-for="link in links" :key="link.id">
          <img
            class="favicon ml-1"
            :src="getFavicon(link.url)"
            @error="loadDefault($event, link.url)"
          />
          <a class="link hover:underline" :href="link.url">{{link.title}}</a>
        </div>
      </transition-group>
    </draggable>
    <div v-if="editing" class="form-group text-right" @keydown.esc="toggleForm">
      <div class="md:flex md:items-center content-start my-2">
        <label class="bkmrk-label">Title</label>
        <input
          v-model="bkmTitle"
          class="md:flex-1 bkmrk-field focus:outline-none focus:bg-gray-200"
          type="text"
          @keydown.enter="focusNextField"
        />
      </div>
      <div class="md:flex md:items-center content-start my-2">
        <label class="bkmrk-label">URL</label>
        <input
          v-model="bkmURL"
          class="md:flex-1 bkmrk-field focus:outline-none focus:bg-gray-200"
          type="url"
          @keydown.enter="toggleForm"
        />
      </div>
      <button
        @click="deleteBookmark"
        v-if="bkmId"
        class="remove-bookmark bg-gray-100 focus:outline-none focus:opacity-75 focus:bg-gray-300 hover:opacity-75 hover:shadow hover:bg-gray-200"
      >
        <div class="bg"></div>
      </button>
    </div>
    <div class="text-center h-8 pt-3">
      <button
        @click="toggleForm"
        class="add-bookmark bg-gray-100 focus:outline-none focus:opacity-100 focus:bg-gray-300 hover:opacity-100 hover:shadow hover:bg-gray-200"
      />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "bookmark",
  components: {
    draggable
  },
  props: {
    cardId: Number,
    body: Array
  },
  data: function() {
    return {
      editing: false,
      bkmTitle: "",
      bkmURL: "",
      bkmId: undefined
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
          bkmList: list
        });
      }
    }
  },
  methods: {
    getFavicon(url) {
      let siteUrl = url;
      try {
        siteUrl = new URL(url).origin;
      } catch (error) {
        console.log(url);
        siteUrl = "https://" + (url.split("/")[0] || url);
        console.log(siteUrl);
      }
      return siteUrl + "/favicon.ico";
    },
    loadDefault(e, url) {
      e.target.src =
        "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;
    },
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
          siteUrl = "https://" + (url.split("/")[0] || url);
        }
        if (this.bkmId) {
          this.$store.commit("updateBookmark", {
            id: this.cardId,
            bkmId: this.bkmId,
            title,
            url: siteUrl
          });
          this.bkmId = undefined;
        } else
          this.$store.commit("addBookmark", {
            id: this.cardId,
            title,
            url: siteUrl
          });
      }
    },
    editBookmark(e, link) {
      this.bkmTitle = link.title;
      this.bkmURL = link.url;
      this.bkmId = link.id;

      this.toggleForm(e);
    },
    deleteBookmark(e) {
      this.$store.commit("deleteBookmark", {
        id: this.cardId,
        bkmId: this.bkmId
      });
      this.bkmTitle = "";
      this.bkmURL = "";
      this.bkmId = undefined;
      this.editing = false;
    }
  }
};
</script>

<style>
.add-bookmark {
  @apply rounded-full;
  @apply opacity-75;
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/add.svg");
  background-size: 24px 24px;
  transition: all 200ms ease-out;
}
.remove-bookmark {
  @apply rounded-full;
  @apply opacity-50;
  height: 28px;
  width: 28px;
  padding: 2px;
  transition: all 200ms ease-out;
}
.remove-bookmark .bg {
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/delete.svg");
  background-size: 24px 24px;
}

.bkmrk-label {
  @apply block;
  @apply text-gray-700;
  @apply text-left;
  @apply pr-2;
  min-width: 48px;
}
.bkmrk-field {
  @apply appearance-none;
  @apply bg-gray-100;
  @apply rounded;
  @apply w-full;
  @apply py-0;
  @apply px-2;
  @apply text-gray-700;
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
  @apply text-sm;
  @apply text-teal-700;
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

.favicon {
  float: left;
  cursor: move;
  margin: 4px 0;
  height: 16px;
  width: 16px;
  display: inline;
}
</style>