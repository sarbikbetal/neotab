<template>
  <nav
    class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-gray-200 z-10"
  >
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <searchBar />
    <button
      class="widget-btn flex items-center justify-center ripple hover:bg-gray-200 focus:outline-none focus:bg-gray-200 px-3 py-2"
    >
      <img class="inline" src="/img/icons/add.svg" alt />
      <span class="text-base">Widget</span>
    </button>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>
    <aside
      class="flex flex-col transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span @click="isOpen = false" class="flex w-full items-center p-4 border-b">
        <h2 class="text-2xl">Neotab</h2>
      </span>
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
      >
        <span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
        <span>Home</span>
      </span>
      <div class="flex-1"></div>
      <div class="hidden md:flex items-center justify-around my-3">
        <button
          class="col-btn ripple hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          @click="dec"
        >-</button>
        <span>{{this.$store.state.columns.length}} Columns</span>
        <button
          class="col-btn ripple hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          @click="inc"
        >+</button>
      </div>
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
      >
        <span class="mr-2">
          <svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"
            />
          </svg>
        </span>
        <span>About</span>
      </span>
    </aside>
  </nav>
</template>

<script>
import searchBar from "@/components/SearchBar";
export default {
  name: "navbar",
  components: {
    searchBar,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    inc() {
      this.$store.commit("increaseCols");
    },
    dec() {
      this.$store.commit("decreaseCols");
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
};
</script>

<style>
.col-btn {
  @apply py-2;
  @apply w-10;
  @apply mx-2;
  @apply rounded-full;
  @apply bg-gray-300;
}

.widget-btn {
  @apply bg-gray-100;
  @apply transition-all;
  @apply duration-300;
  @apply rounded-full;
  @apply shadow-lg;
  @apply absolute;
  width: 7rem;
  top: 85vh;
  right: 5vw;
}

@screen md {
  .widget-btn {
    @apply static;
    @apply shadow-none;
  }
}
</style>