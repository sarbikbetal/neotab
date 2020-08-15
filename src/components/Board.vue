<template>
  <div  class="board flex flex-col md:flex-row mb-2">
    <column v-for="(col, i) in columns" :key="col">
      <draggable
        v-model="data[i]"
        @input="reorderTodo($event, i)"
        group="columns"
        @start="drag=true"
        @end="drag=false"
        class="h-full"
        ghost-class="card-ghost"
        handle=".handle"
      >
        <transition-group name="list" tag="div" class="h-full">
          <card
            v-for="element in data[i]"
            :key="element.id"
            :cardId="element.id"
            :type="element.type"
            :title="element.title"
            :text="element.text"
            :body="element.body"
            :card="element.id"
          />
        </transition-group>
      </draggable>
    </column>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import column from "@/components/Column";
import card from "@/components/Card";
import { mapState } from "vuex";

export default {
  name: "board",
  components: {
    draggable,
    column,
    card,
  },
  
  computed: {
    ...mapState({
      data: "cardData",
      columns: "columns",
    }),
  },
  methods: {
    reorderTodo(list, col) {
      this.$store.commit("reorderCards", { list, col });
    },
  },
};
</script>

<style>
.board {
  background: var(--board);
}
.list-enter-active {
  transition: all 0.3s;
}
.list-enter {
  opacity: 0.1;
}
.list-leave-to,
.list-leave {
  opacity: 0;
}
.list-move {
  transition: transform 0.2s;
}
.card-ghost {
  height: 48px;
  background: #9e9e9e;
  opacity: 0;
}
</style>