<template>
  <div class="md:flex mb-4">
    <column v-for="(col, i) in cols" :key="col">
      <draggable v-model="arr[i]" group="people" @start="drag=true" @end="drag=false" class="h-full" ghost-class="card-ghost">
        <transition-group name="list" tag="div" class="h-full">
            <card v-for="element in arr[i]" :key="element.id" :type="element.type" :title="element.title" :body="element.body" />
        </transition-group>
      </draggable>
    </column>

    <button @click="inc">Increase</button>
    <button @click="dec">Decrease</button>
  </div>
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
          { id: 1, title: "Zym" },
          { id: 2, title: "Zam" },
          { id: 3, title: "Leka" },
          { id: 4, title: "Lula" },
          { id: 5, title: "Lalafazam" }
        ],
        [
          { id: 6, type:"note", title: "Zamzar", body: "Hi I am a note!" },
          { id: 7, type:"note", title: "Zazam", body: "And I am a lote!" },
          { id: 8, title: "Lek5a" },
          { id: 9, title: "Lu4la" },
          { id: 10, title: "Lala5fazam" }
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