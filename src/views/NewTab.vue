<template>
  <div>
    <navbar />
    <board />
  </div>
</template>

<script>
import navbar from "@/components/NavBar";
import board from "@/components/Board";

export default {
  name: "newtab",
  components: {
    navbar,
    board
  }
};
</script>

<style>
</style>