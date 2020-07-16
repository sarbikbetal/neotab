<template>
  <nav class="searchbar">
    <h1 class="text-2xl pl-6 md:pl-10">NeoTab</h1>
    <searchBar />
    <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">3</div>
  </nav>
</template>

<script>
import searchBar from "@/components/SearchBar";
export default {
  name: "navbar",
  components: {
    searchBar
  }
};
</script>

<style scoped>
.searchbar {
  @apply py-1;
  @apply flex flex-row items-center justify-between;
  @apply w-full h-16;
}

</style>