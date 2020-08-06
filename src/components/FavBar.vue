<template>
  <div class="mx-6 md:mx-8 lg:mx-10 pt-16">
    <div class="fav-thumb-container">
      <!-- Left scroll button -->
      <fab @click.native="scrollLeft" class="scroll-btn left">
        <svg viewBox="0 0 24 24" fill="black" width="18px" height="18px">
          <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
          <path
            fill="#4a5568"
            d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
          />
        </svg>
      </fab>

      <!-- Site thumbs -->
      <section id="fav-bar" class="flex overflow-x-auto overflow-y-hidden no-scrollbar">
        <draggable
          v-model="sites"
          group="sites"
          @start="drag=true"
          @end="drag=false"
          direction="horizontal"
        >
          <transition-group name="sites" tag="div" class="flex">
            <div
              v-for="site in sites"
              :key="site.key"
              class="thumb hover:shadow-md hover:bg-gray-200 flex justify-center items-center"
            >
              <img
                class="favicon mini-fav select-none"
                :title="site.url"
                :src="getFavicon(site.url)"
                @error="loadDefault($event, site.url)"
              />
            </div>
          </transition-group>
        </draggable>
      </section>

      <!-- Right scroll button -->
      <fab @click.native="scrollRight" class="scroll-btn right">
        <svg viewBox="0 0 24 24" width="18px" height="18px">
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path
            fill="#4a5568"
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
  data: function () {
    return {
      sites: [
        {
          key: 0,
          url: "https://github.com",
        },
        {
          key: 1,
          url: "https://vuex.vuejs.org",
        },
        {
          key: 2,
          url: "https://www.npmjs.com",
        },
        {
          key: 3,
          url: "https://scotch.io",
        },
      ],
    };
  },
  methods: {
    getFavicon,
    loadDefault,
    scrollLeft() {
      console.log("left");
      document.getElementById("fav-bar").scrollBy(-280, 0);
    },
    scrollRight() {
      console.log("right");
      document.getElementById("fav-bar").scrollBy(280, 0);
    },
  },
};
</script>

<style scoped>
.fav-thumb-container {
  @apply flex;
  @apply justify-center;
  @apply h-12;
  @apply rounded-md;
  @apply relative;
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
  @apply text-center;
  @apply rounded-full;
  @apply bg-gray-300;
  @apply relative;
  @apply cursor-pointer;
  @apply transition-all;
  @apply duration-300;
  @apply ease-out;
}
.mini-fav {
  @apply cursor-move;
}
.initials {
  @apply font-sans;
  @apply text-gray-700;
  font-size: 2rem;
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
</style>