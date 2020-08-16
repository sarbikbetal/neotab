<template>
  <div class="favbar px-6 md:px-8 lg:px-10 pt-16">
    <div class="fav-thumb-container" @click="isAddFavOpen=false">
      <!-- Left scroll button -->
      <fab @click.native="scrollLeft" class="scroll-btn left">
        <svg viewBox="0 0 24 24" fill="black" width="18px" height="18px">
          <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
          <path
            fill="var(--text-light)"
            d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
          />
        </svg>
      </fab>

      <!-- Site thumbs -->
      <section
        id="fav-bar"
        class="flex items-center overflow-x-auto overflow-y-hidden no-scrollbar mx-6"
      >
        <draggable
          v-model="sites"
          group="sites"
          @start="drag=true"
          @end="drag=false"
          direction="horizontal"
        >
          <transition-group name="sites" tag="div" class="flex items-center">
            <a
              v-for="site in sites"
              target="_blank"
              :fav="site.key"
              :href="site.url"
              :key="site.key"
              class="thumb hover:shadow-md"
            >
              <img
                class="favicon select-none"
                :title="site.url"
                :src="getFavicon(site.url)"
                @error="loadDefault($event, site.url)"
              />
            </a>
          </transition-group>
        </draggable>
        <!-- Add button -->
        <div
          :key="999999"
          class="thumb transition-all duration-300"
          :class="isAddFavOpen?'add-fav-open': 'add-fav'"
          @click="$event.stopPropagation()"
        >
          <input
            id="favUrlInput"
            @keydown.enter="addFavourite"
            @keydown.esc="isAddFavOpen=false"
            v-model="newFavUrl"
            v-if="isAddFavOpen"
            class="bg-transparent py-2 px-4 block w-full appearance-none leading-normal focus:outline-none"
            type="text"
            placeholder="Add a new favourite"
          />
          <button @click="toggleFavInput" class="focus:outline-none">
            <svg class="select-none m-2" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                fill="var(--text-light)"
                d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
              />
            </svg>
          </button>
        </div>
      </section>

      <!-- Right scroll button -->
      <fab @click.native="scrollRight" class="scroll-btn right">
        <svg viewBox="0 0 24 24" width="18px" height="18px">
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path
            fill="var(--text-light)"
            d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"
          />
        </svg>
      </fab>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import fab from "@/components/Fab";
import { getFavicon, loadDefault } from "../services/favicon";
export default {
  name: "favBar",
  components: {
    draggable,
    fab,
  },
  props: {
    open: { type: Boolean, default: false },
    url: { type: String, default: "" },
  },
  data: function () {
    return {
      isAddFavOpen: this.open,
      newFavUrl: this.url,
    };
  },
  watch: {
    open: function () {
      this.isAddFavOpen = this.open;
      this.newFavUrl = this.url;
    },
  },
  computed: {
    sites: {
      get() {
        return this.$store.state.favSites;
      },
      set(list) {
        this.$store.commit("reorderFavs", { list });
      },
    },
  },
  methods: {
    getFavicon,
    loadDefault,
    scrollLeft() {
      document.getElementById("fav-bar").scrollBy(-280, 0);
    },
    scrollRight() {
      document.getElementById("fav-bar").scrollBy(280, 0);
    },
    toggleFavInput(e) {
      e.stopPropagation();
      if (this.isAddFavOpen) this.addFavourite();
      else this.isAddFavOpen = true;
    },
    addFavourite() {
      let url = this.newFavUrl;
      if (url.length != 0) {
        let siteUrl = url;
        try {
          siteUrl = new URL(url).href;
        } catch (error) {
          siteUrl = "https://" + url;
        }

        this.$store.commit("addFavSite", siteUrl);
        // this.sites.push({
        //   key: this.sites.length,
        //   url: siteUrl,
        // });

        this.newFavUrl = "";
      }
      this.isAddFavOpen = false;
    },
  },
  updated() {
    if (this.isAddFavOpen) {
      document.getElementById("favUrlInput").focus();
      setTimeout(() => {
        document.getElementById("fav-bar").scrollBy(240, 0);
      }, 300);
    }
  },
};
</script>

<style scoped>
.favbar {
  background-color: var(--header-bg-color);
}
.fav-thumb-container {
  @apply flex;
  @apply justify-start;
  @apply pb-2;
  @apply rounded-md;
  @apply relative;
  height: 3.5rem;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.scroll-btn {
  @apply absolute;
  z-index: 3;
  top: 7px;
}
.scroll-btn.left {
  left: -16px;
}
.scroll-btn.right {
  right: -16px;
}
.thumb {
  @apply h-10;
  @apply w-10;
  @apply mx-2;
  @apply my-1;
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply text-center;
  @apply rounded-full;
  @apply relative;
  @apply cursor-pointer;
  @apply transition-all;
  @apply duration-300;
  @apply ease-out;
  background-color: var(--primary);
}
.thumb:hover {
  background-color: var(--primary-light);
}
.sites-enter-active,
.sites-leave-active {
  transition: all 0.3s;
}
.sites-enter {
  opacity: 0.1;
}
.sites-leave-to {
  opacity: 0;
}
.sites-leave {
  opacity: 1;
}
.sites-move {
  transition: transform 0.2s;
}
.add-fav {
  @apply h-8;
  @apply w-8;
}
.add-fav-open {
  @apply h-10;
  @apply w-64;
}
</style>