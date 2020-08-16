<template>
  <div class="searchbar flex-1 flex md:max-w-lg lg:max-w-xl items-center">
    <button
      @click="isChooserOpen=!isChooserOpen"
      class="searchengine-select relative focus:outline-none"
    >
      <img class="searchengine-logo" :src="selectedEngine.icon" alt />
      <svg class="w-2 h-2 ml-2" viewBox="0 0 412 232">
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="var(--text)"
          fill-rule="nonzero"
        />
      </svg>
      <div v-if="isChooserOpen" class="searchengine-chooser">
        <button
          v-for="item in searchEngines"
          :key="item.name"
          @click="setEngine(item)"
          class="searchengine-option focus:outline-none"
        >
          <img class="searchengine-logo inline" :src="item.icon" alt />
          <span class="px-2">{{item.name}}</span>
        </button>
      </div>
    </button>
    <input
      @keyup.enter="search"
      @keyup.esc="$event.target.blur()"
      v-model="terms"
      class="websearch ml-2 py-2 pr-4 block w-full appearance-none leading-normal"
      type="text"
      placeholder="Search the web"
    />
  </div>
</template>

<script>
export default {
  name: "searchBar",
  data: function () {
    return {
      terms: "",
      isChooserOpen: false,
      searchEngines: [
        {
          name: "DuckDuckGo",
          url: "https://duckduckgo.com/?q=",
          icon: "https://duckduckgo.com/favicon.ico",
        },
        {
          name: "Google",
          url: "https://google.com/search?q=",
          icon: "https://google.com/favicon.ico",
        },
        {
          name: "Ecosia",
          url: "https://www.ecosia.org/search?q=",
          icon: "https://cdn.ecosia.org/assets/images/ico/favicon.ico",
        },
        {
          name: "Qwant",
          url: " https://www.qwant.com/?q=",
          icon: "https://qwant.com/favicon.ico",
        },
        {
          name: "Bing",
          url: "https://www.bing.com/search?q=",
          icon: "https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico",
        },
        {
          name: "Yandex",
          url: "https://yandex.com/search/?text=",
          icon:
            "https://yastatic.net/iconostasis/_/KKii9ECKxo3QZnchF7ayZhbzOT8.png",
        },
      ],
    };
  },
  computed: {
    selectedEngine() {
      return this.$store.state.searchEngine || this.searchEngines[0];
    },
  },
  methods: {
    search() {
      try {
        var win = window.open(this.selectedEngine.url + this.terms, "_blank");
        win.focus();
      } catch (error) {
        // show a popup and allow opening new sites
        // window.location.href = this.selectedEngine.url + this.terms;
      }
    },
    setEngine(item) {
      this.$store.commit("setSearchEngine", item);
    },
  },
};
</script>

<style>
.websearch {
  @apply mr-2;
  @apply transition-all;
  @apply duration-300;
  @apply ease-in-out;
  @apply bg-transparent;
}
.websearch:focus {
  outline: none;
}
.websearch::placeholder {
  color: var(--text-light);
}
.searchbar {
  background-color: var(--primary);
  @apply rounded-lg;
}
.searchbar:hover {
  background-color: var(--primary-light);
  border-color: var(--accent);
}
.searchbar:focus {
  background-color: var(--primary-light);
}
.searchengine-logo {
  max-width: none;
  height: 22px;
  width: 22px;
}
.searchengine-select {
  @apply px-2;
  @apply my-2;
  @apply flex;
  @apply items-center;
  border-right: transparent 2px solid;
}
.searchengine-select:hover,
.searchengine-select:focus {
  border-right: var(--text-light) 2px solid;
}
.searchengine-chooser {
  top: 28px;
  left: 0px;
  @apply mt-2;
  @apply w-40;
  @apply absolute;
  @apply bg-white;
  @apply rounded-lg;
  @apply shadow-xl;
  background-color: var(--primary);
}
.searchengine-option {
  @apply w-full;
  @apply px-4;
  @apply py-2;
  @apply flex;
  @apply rounded-lg;
  @apply bg-transparent;
  color: var(--text);
}
.searchengine-option:hover,
.searchengine-option:focus {
  background-color: var(--secondary);
  color: var(--primary);
}
</style>