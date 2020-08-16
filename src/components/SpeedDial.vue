<template>
  <div
    :class="open ? 'md-active' : ''"
    class="md-speed-dial md-fab-bottom-right md-theme-default md-mode-scale md-direction-top"
  >
    <div @keydown.esc="open = false" v-show="open" class="fixed inset-0 transition-opacity">
      <div @click="open = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
    </div>
    <button
      @click="toggleSD"
      class="flex md-button items-center justify-between md-ripple text-gray-800"
      style="padding: 8px 20px 8px 12px;"
      md-fab-trigger
    >
      <svg
        :class="open ? 'cross' : ''"
        class="inline sd-icon"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          fill="#212121"
          d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
        />
      </svg>
      <span v-if="!open" class="pl-1 text-base">Widget</span>
      <span v-else class="pl-1 text-base">Close</span>
    </button>

    <button
      @click="addNoteCard"
      class="flex md-button md-ripple justify-between text-gray-800"
      style="padding: 8px 20px 8px 12px;"
    >
      <svg class="inline" height="24" viewBox="0 0 24 24" width="24">
        <rect fill="none" height="24" width="24" />
        <path
          fill="#212121"
          d="M19,5v9l-5,0l0,5H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h10l6-6V5C21,3.9,20.1,3,19,3z M12,14H7v-2h5V14z M17,10H7V8h10V10z"
        />
      </svg>
      <span class="pl-1 text-base">Note</span>
    </button>
    <button
      @click="addTodoCard"
      class="flex md-button md-ripple justify-between text-gray-800"
      style="padding: 8px 20px 8px 12px;"
    >
      <svg class="inline" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          fill="#212121"
          d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z"
        />
      </svg>
      <span class="pl-1 text-base">Todo</span>
    </button>
    <button
      @click="addBookmarkCard"
      class="flex md-button md-ripple justify-between text-gray-800"
      style="padding: 8px 20px 8px 12px;"
    >
      <svg class="inline" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          fill="#212121"
          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
        />
      </svg>
      <span class="pl-1 text-base">Links</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "speedDial",
  data: function () {
    return {
      open: false,
    };
  },
  methods: {
    toggleSD(e) {
      this.open = !this.open;
    },
    addNoteCard(e) {
      this.$store.commit("addNoteCard");
      this.toggleSD();
    },
    addTodoCard(e) {
      this.$store.commit("addTodoCard");
      this.toggleSD();
    },
    addBookmarkCard(e) {
      this.$store.commit("addBookmarkCard");
      this.toggleSD();
    },
  },
};
</script>

<style scoped>
.cross {
  transform: rotate(45deg) scale(1.2);
}
.sd-icon {
  transition: all 200ms;
}

.md-button {
  /* #ffd959 */
  display: block;
  min-height: 3rem;
  width: 100%;
  transition: width 300ms;
  @apply shadow-lg;
  @apply rounded-full;
  color: #212121;
  background-color: var(--accent);
}
.md-button:hover {
  @apply shadow-lg;
  background-color: var(--accent-light);
}
.md-button:focus {
  background-color: var(--accent-light);
  outline: none;
}

.md-ripple {
  background-position: center;
  transition: background 0.3s;
}

.md-ripple:active {
  background-size: 100%;
  transition: background 0s !important;
}

.md-speed-dial [md-fab-trigger] ~ .md-button {
  -webkit-transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 2);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 2);
}

.md-fab.md-fab-bottom-right,
.md-speed-dial.md-fab-bottom-right {
  margin: 0;
  height: 3rem;
  z-index: 4;
}

.md-speed-dial {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  flex-direction: column-reverse;
  -webkit-box-align: center;
  align-items: center;
}

.md-speed-dial.md-direction-top [md-fab-trigger] {
  margin-top: 8px;
}

.md-speed-dial.md-direction-top [md-fab-trigger] ~ .md-button {
  margin-bottom: 16px;
}

.md-speed-dial.md-mode-scale [md-fab-trigger] ~ .md-button {
  -webkit-transform: scale(0.6);
  transform: scale(0.6);
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: translate3D(0, 0, 0) !important;
  transform: translate3D(0, 0, 0) !important;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(2) {
  -webkit-transition-delay: 0.05s;
  transition-delay: 0.05s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(3) {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(4) {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(5) {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(6) {
  -webkit-transition-delay: 0.25s;
  transition-delay: 0.25s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(7) {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(8) {
  -webkit-transition-delay: 0.35s;
  transition-delay: 0.35s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(9) {
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(10) {
  -webkit-transition-delay: 0.45s;
  transition-delay: 0.45s;
}

.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(11) {
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}

.md-speed-dial .md-button {
  margin: 0;
}

.md-speed-dial [md-fab-trigger] {
  position: relative;
  z-index: 2;
}

.md-speed-dial [md-fab-trigger] ~ .md-button {
  position: relative;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(2) {
  -webkit-transition-delay: 0.05s;
  transition-delay: 0.05s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(3) {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(4) {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(5) {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(6) {
  -webkit-transition-delay: 0.25s;
  transition-delay: 0.25s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(7) {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(8) {
  -webkit-transition-delay: 0.35s;
  transition-delay: 0.35s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(9) {
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(10) {
  -webkit-transition-delay: 0.45s;
  transition-delay: 0.45s;
}

.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(11) {
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}
</style>