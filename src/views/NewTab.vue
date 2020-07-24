<template>
  <div>
    <navigation />
    <board />
  </div>
</template>

<script>
import navigation from "@/components/NavBar";
import board from "@/components/Board";

export default {
  name: "newtab",
  components: {
    navigation,
    board
  }
};
</script>

<style>
</style>