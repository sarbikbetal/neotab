<template>
  <div :style="getPosition" class="menu" :class="show? 'show-menu':''">
    <ul class="menu-options">
      <li
        v-for="(value, action) in options"
        :key="action"
        @click="$emit(action)"
        class="menu-option"
        :class="value ? '': 'menu-disabled'"
      >{{action}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "contextMenu",
  props: {
    show: Boolean,
    options: Object,
    position: Object,
  },
  computed: {
    getPosition: function () {
      let { top, left } = this.position;
      let menuWidth = 124;
      let menuHeight = 44;

      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      if (windowWidth - left < menuWidth) {
        left = 1 + windowWidth - menuWidth + "px";
      } else {
        left = 1 + left + "px";
      }

      if (windowHeight - top < menuHeight) {
        top = 1 + windowHeight - menuHeight + "px";
      } else {
        top = 1 + top + "px";
      }
      
      return { top, left };
    },
  },
};
</script>

<style>
.menu {
  background-color: var(--header-bg-color);
  @apply shadow-xl;
  @apply rounded;
  @apply opacity-0;
  @apply hidden;
  width: 120px;
  position: absolute;
}
.show-menu {
  @apply block;
  @apply opacity-100;
}
.menu .menu-options {
  list-style: none;
}
.menu .menu-options .menu-option {
  font-weight: 500;
  font-size: 14px;
  padding: 10px 40px 10px 20px;
  cursor: pointer;
}
.menu .menu-options .menu-option.menu-disabled {
  background-color: var(--primary);
  @apply opacity-25;
  pointer-events: none;
}
.menu .menu-options .menu-option:hover {
  @apply rounded;
  background-color: var(--primary);
}
</style>