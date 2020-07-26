<template>
  <div class="expanded flex-1 flex-shrink-1 bg-gray-100 m-2 py-2">
    <slot />
  </div>
</template>

<script>
export default {
  name: "column",
};
</script>

<style>
@screen md {
  .expanded {
    min-height: calc(100vh - 96px);
  }
}
</style>