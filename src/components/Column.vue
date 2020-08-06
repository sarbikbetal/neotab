<template>
  <div class="expanded flex-1 flex-shrink-1 bg-transparent m-1">
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
    min-height: calc(100vh - 10rem);
  }
}
</style>