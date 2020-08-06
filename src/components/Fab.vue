<template>
  <button class="fab ripple p-2 focus:outline-none hover:bg-gray-200 hover:shadow-lg">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "fab",
};
</script>

<style>
.fab {
  @apply rounded-full;
  @apply bg-gray-100;
  @apply shadow-md;
}
/* Ripple effect */
.ripple {
  background-position: center;
  transition: background 0.3s;
  transition: box-shadow 0.3s;
}
.ripple:hover {
  background: #0000001f radial-gradient(circle, transparent 1%, #0000001f 1%)
    center/15000%;
}
.ripple:active {
  background-color: #0000001f;
  background-size: 100%;
  transition: background 0s;
}
</style>