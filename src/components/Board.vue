<template>
  <div class="md:flex mb-4">
    <column v-for="(col, i) in cols" :key="col">
      <draggable
        v-model="arr[i]"
        group="columns"
        @start="drag=true"
        @end="drag=false"
        class="h-full"
        ghost-class="card-ghost"
        handle=".handle"
      >
        <transition-group name="list" tag="div" class="h-full">
          <card
            v-for="element in arr[i]"
            :key="element.id"
            :type="element.type"
            :title="element.title"
            :text="element.text"
            :body="element.body"
          />
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
          {
            id: 1,
            type: "todo",
            title: "Zym",
            body: [
              { id: 1, text: "This is a todo", done: true },
              { id: 2, text: "This is another todo", done: false }
            ]
          },
          {
            id: 2,
            type: "bookmark",
            title: "Zam",
            body: [
              { id: 1, title: "Duckduckgo", url: "https://duckduckgo.com" },
              { id: 2, title: "Github", url: "https://dashboard.heroku.com/apps" }
            ]
          },
          { id: 3, title: "Leka" },
          { id: 4, title: "Lula" },
          { id: 5, title: "Lalafazam" }
        ],
        [
          { id: 6, type: "note", title: "Zamzar", text: "Hi I am a note!" },
          { id: 7, type: "note", title: "Zazam", text: "And I am a lote!" },
          {
            id: 8,
            type: "todo",
            title: "Lerua",
            body: [
              { id: 3, text: "This is a todo", done: false },
              { id: 4, text: "This is another todo", done: true }
            ]
          },
          { id: 9, title: "Lu4la" },
          { id: 10, title: "Lala5fazam" }
        ]
      ],
      cols: [0, 1]
    };
  },
  methods: {
    inc() {
      if (this.cols.length < 5) {
        this.cols.push(this.cols.length);
        this.arr.push([]);
      }
    },
    dec() {
      if (this.cols.length > 2) {
        this.cols.pop();
        this.arr.pop();
      }
    }
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