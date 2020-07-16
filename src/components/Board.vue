<template>
<section>
  <div class="grid grid-cols-2 gap-4">
    <button @click="dec" class="flex-grow">Decrease</button>
    <button @click="inc" class="flex-grow">Increase</button>
  </div>
  <div class="flex mb-4">
    <column v-for="(col, i) in cols" :key="col">
      <draggable v-model="arr[i]" group="people" @start="drag=true" @end="drag=false" class="h-full" ghost-class="card-ghost">
        <transition-group name="list" tag="div" class="h-full">
            <card v-for="element in arr[i]" :key="element.id">{{element.name}}</card>
        </transition-group>
      </draggable>
    </column>
  </div>
</section>
</template>

<script>
import draggable from "vuedraggable";
import column from "@/components/Column";
import card from "@/components/Card";

export default {
  name: "board",
  components: {
    draggable,
    column,
    card
  },
  data: function() {
    return {
      arr: [
        [
          { id: 1, name: "Zym" },
          { id: 2, name: "Zam" },
          { id: 3, name: "Leka" },
          { id: 4, name: "Lula" },
          { id: 5, name: "Lalafazam" }
        ],
        [
          { id: 6, name: "2Zym" },
          { id: 7, name: "Z3am" },
          { id: 8, name: "Lek5a" },
          { id: 9, name: "Lu4la" },
          { id: 10, name: "Lala5fazam" }
        ]
      ],
      cols: [0, 1]
    };
  },
  methods: {
    inc() {
      this.cols.push(this.cols.length);
      this.arr.push([]);
    },
    dec() {
      this.cols.pop();
      this.arr.pop();
    }
  }
};
</script>

<style>
.list-enter-active {
  transition: all 0.3s;
}
.list-enter{
  opacity: 0.1;
}
.list-leave-to, .list-leave{
  opacity: 0;
}
.list-move {
  transition: transform 0.2s;
}
.card-ghost{
    height: 36px;
    background: #9e9e9e;
    opacity: 0;
    border: dashed #505050b0 2px;
}

</style>