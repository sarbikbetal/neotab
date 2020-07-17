<template>
  <div>
    <p
      @keydown.enter="focusOut"
      @dblclick="makeEditable"
      @blur="updateTitle"
      spellcheck="false"
      class="title font-bold text-xl rounded-sm mr-8 px-1 text-gray-700 appearance-none focus:outline-none focus:bg-gray-200"
    >{{titleData}}</p>
    <draggable
      v-model="todoList"
      group="todos"
      @start="drag=true"
      @end="drag=false"
      handle=".todo-handle"
      ghost-class="todo-ghost"
    >
      <transition-group name="todo" tag="div">
        <div v-for="todo in todoList" :key="todo.id">
          <i class="todo-handle" />
          <p :class="todo.done ? 'line-through' : 'no-underline'" class="todo">{{todo.text}}</p>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "todo",
  components: {
    draggable
  },
  props: {
    title: String,
    body: Array
  },
  data: function() {
    return {
      titleData: this.title,
      todoList: this.body
    };
  },
  methods: {
    focusOut(e) {
      e.target.blur();
      this.removeEditable(e);
    },
    updateTitle(e) {
      this.titleData = e.target.innerText;
    },
    makeEditable(e) {
      e.target.contentEditable = true;
      e.target.focus();
    },
    removeEditable(e) {
      e.target.contentEditable = false;
    }
  }
};
</script>

<style>
p.title {
  transition: all 200ms ease-out;
  text-decoration: none;
}
.todo {
  @apply pl-4;
}
.todo-enter-active {
  transition: all 0.3s;
}
.todo-enter {
  opacity: 0.1;
}
.todo-leave-to,
.todo-leave {
  opacity: 0;
}
.todo-move {
  transition: transform 0.2s;
}
.todo-handle {
  float: left;
  cursor: move;
  margin: 4px 0;
  opacity: 0.6;
  height: 16px;
  width: 16px;
  background: no-repeat url("/img/icons/drag_indicator.svg");
  background-size: 16px 16px;
}
.todo-ghost {
  opacity: 0.2;
}
</style>