<template>
  <div>
    <draggable
      v-model="links"
      group="links"
      @start="drag=true"
      @end="drag=false"
      handle=".favicon"
      ghost-class="link-ghost"
    >
      <transition-group name="link" tag="div">
        <div v-for="link in links" :key="link.id">
          <img class="favicon ml-1" :src="getFavicon(link.url)" @error="loadDefault" />
          <a class="link hover:underline" :href="link.url">{{link.title}}</a>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "bookmark",
  components: {
    draggable
  },
  props: {
    body: Array
  },
  data: function() {
    return {
      links: this.body
    };
  },
  methods: {
    getFavicon(url) {
      let siteUrl = new URL(url);
      return (
        "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
        siteUrl.origin
      );
    },
    loadDefault(e) {
      e.target.src = "./img/icons/public.svg";
    }
  }
};
</script>

<style>
.link {
  @apply pl-1;
  @apply text-sm;
  @apply text-teal-700;
}
.link-enter-active {
  transition: all 0.3s;
}
.link-enter {
  opacity: 0.1;
}
.link-leave-to,
.link-leave {
  opacity: 0;
}
.link-move {
  transition: transform 0.2s;
}

.link-ghost {
  opacity: 0.2;
}

.favicon {
  float: left;
  cursor: move;
  margin: 4px 0;
  height: 16px;
  width: 16px;
  display: inline;
}
</style>