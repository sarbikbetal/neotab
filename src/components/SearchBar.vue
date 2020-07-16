<template>
  <input
    @keyup.enter="search"
    v-model="terms"
    class="websearch placeholder-gray-600 hover:bg-gray-100 hover:shadow focus:outline-none focus:bg-white focus:shadow-md md:max-w-lg lg:max-w-xl"
    type="text"
    placeholder="Search the web"
  />
</template>

<script>
export default {
  name: "searchBar",
  data: function() {
    return {
      terms: ""
    };
  },
  methods: {
    search() {
      window.location.href = `https://duckduckgo.com/?q=${this.terms}`;
    }
  }
};
</script>

<style>
.websearch {
  @apply mx-4;
  @apply transition-all duration-300 ease-in-out;
  @apply rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal;
}
</style>