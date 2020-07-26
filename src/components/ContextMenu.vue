<template>
  <div class="menu" :class="show? 'show-menu':''">
    <ul class="menu-options">
      <li @click="copy" class="menu-option" :class="text ? '': 'menu-disabled'">Copy</li>
      <li class="divider"></li>
      <li @click="deleteCard" class="menu-option" :class="cardId ? '': 'menu-disabled'">Delete</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "contextMenu",
  props: {
    show: Boolean,
    cardId: Number,
    text: String,
  },
  methods: {
    deleteCard() {
      this.$store.commit("deleteCard", {
        id: this.cardId,
      });
    },
    copy() {
      navigator.clipboard.writeText(this.text);
    },
  },
};
</script>

<style>
.menu {
  @apply bg-white;
  @apply shadow-xl;
  @apply rounded;
  @apply opacity-0;
  scale: 0;
  width: 120px;
  position: absolute;
  transition: opacity 200ms, scale 200ms;
}
.show-menu {
  scale: 1;
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
  @apply bg-gray-300;
  @apply opacity-25;
  pointer-events: none;
}
.menu .menu-options .menu-option:hover {
  @apply rounded;
  @apply bg-gray-300;
}

.menu .menu-options .divider {
  @apply bg-gray-300;
  height: 1px;
}
</style>