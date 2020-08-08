<template>
  <nav class="navbar flex fixed w-full items-center justify-between px-3 md:px-6 h-16 z-10">
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
    <span class="text-2xl hidden md:inline">NeoTab</span>
    <speedDial class="add-widget" />

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
      class="drawer flex flex-col transform top-0 left-0 w-64 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span @click="isOpen = false" class="drawer-header flex w-full items-center p-4">
        <h2 class="text-2xl">Neotab</h2>
      </span>
      <span @click="isOpen = false" class="drawer-item flex items-center p-4">
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

      <span class="drawer-item flex items-center justify-between p-4">
        <span>Theme</span>
        <dropdown @input="changeTheme" :selected="selectedTheme" :options="themes" class="ml-2" />
      </span>

      <div class="hidden md:flex items-center justify-around my-3">
        <button class="column-btn ripple" @click="dec">-</button>
        <span>{{this.$store.state.columns.length}} Columns</span>
        <button class="column-btn ripple" @click="inc">+</button>
      </div>

      <span @click="isOpen = false" class="drawer-item flex items-center p-4">
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
import speedDial from "@/components/SpeedDial";
import dropdown from "@/components/Dropdown";
import { setTheme } from "../services/themer";

export default {
  name: "navbar",
  components: {
    searchBar,
    speedDial,
    dropdown,
  },
  data() {
    return {
      isOpen: false,
      themes: ["Light", "Dark"],
    };
  },
  computed: {
    selectedTheme() {
      return this.$store.state.theme;
    },
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
    changeTheme(theme) {
      this.$store.commit("setTheme", theme);
      setTheme(theme);
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
  beforeCreate() {
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });

    setTheme(this.selectedTheme);
  },
};
</script>

<style>
.navbar {
  background-color: var(--header-bg-color);
  color: var(--text-strong);
}
.drawer {
  background-color: var(--header-bg-color);
}
.drawer-header {
  @apply border-b-2;
  border-color: var(--secondary);
}
.drawer-item:hover {
  background-color: var(--secondary);
  color: white;
}
.column-btn {
  @apply py-2;
  @apply w-10;
  @apply mx-2;
  @apply rounded-full;
  background-color: var(--primary);
}
.column-btn:hover {
  background-color: var(--primary-light);
}
.column-btn:focus {
  outline: none;
  background-color: var(--primary-light);
}
.add-widget {
  transition: all 400ms;
  position: absolute;
  right: 2rem;
  top: calc(calc(var(--vh, 1vh) * 99) - 5rem);
}
</style>