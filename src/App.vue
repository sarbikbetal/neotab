<template>
  <div id="app">
    <newtab msg="hello" />
  </div>
</template>

<script>
import newtab from "@/views/NewTab.vue";

export default {
  name: "App",
  components: {
    newtab
  }
};
</script>

<style>
#app {
  @apply font-sans;
}
</style>
