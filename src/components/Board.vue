<template>
  <div class="md:flex mb-4 pt-16">
    <column v-for="(col, i) in columns" :key="col">
      <draggable
        v-model="data[i]"
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
          />
        </transition-group>
      </draggable>
    </column>
    <speedDial/>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import column from "@/components/Column";
import card from "@/components/Card";
import speedDial from "@/components/SpeedDial";
import { mapState } from "vuex";

export default {
  name: "board",
  components: {
    draggable,
    column,
    card,
    speedDial
  },
  computed: {
    ...mapState({
      data: "cardData",
      columns: "columns"
    })
  }
};
</script>

<style>
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