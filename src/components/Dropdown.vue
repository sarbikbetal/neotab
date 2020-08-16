<template>
  <div class="dropdown">
    <svg
      class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
      viewBox="0 0 412 232"
    >
      <path
        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
        fill="var(--text)"
        fill-rule="nonzero"
      />
    </svg>
    <select
      :value="selected"
      @input="$emit('input', $event.target.value)"
      class="dropdown-select hover:border-gray-400 focus:outline-none appearance-none"
    >
      <option
        class="dropdown-option"
        v-for="option in options"
        :key="option"
        :value="option"
      >{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    options: Array,
    selected: String,
  },
};
</script>

<style scoped>
.dropdown {
  @apply relative;
  @apply inline-flex;
}
.dropdown-select {
  background-color: var(--primary);
  border-color: var(--secondary);
  color: var(--text);
  @apply border;
  @apply rounded-full;
  @apply h-10;
  @apply pl-5;
  @apply pr-10;
}
.dropdown-option {
  background-color: var(--primary);
  color: var(--text);
}
</style>