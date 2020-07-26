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
    board,
  },
  beforeCreate() {
    const stateString = window.localStorage.getItem("app-state");
    const oldState = JSON.parse(stateString);

    if (oldState) {
      this.$store.commit("initialiseStore", oldState);
    }
  },
};
</script>

<style>
</style>