<template>
  <input
    @keyup.enter="search"
    v-model="terms"
    class="websearch md:max-w-lg lg:max-w-xl py-2 pr-4 pl-10 block w-full appearance-none leading-normal"
    type="text"
    placeholder="Search the web"
  />
</template>

<script>
export default {
  name: "searchBar",
  data: function () {
    return {
      terms: "",
    };
  },
  methods: {
    search() {
      window.location.href = `https://duckduckgo.com/?q=${this.terms}`;
    },
  },
};
</script>

<style>
.websearch {
  @apply mx-4;
  @apply transition-all;
  @apply duration-300;
  @apply ease-in-out;
  @apply rounded-lg;
  background-color: var(--primary);
}
.websearch:hover {
  background-color: var(--primary-light);
  border-color: var(--accent);
}
.websearch:focus {
  @apply shadow-md;
  outline: none;
  background-color: var(--primary-light);
}
.websearch::placeholder {
  color: var(--text-light);
}
</style>