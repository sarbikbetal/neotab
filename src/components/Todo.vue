<template>
  <div>
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
          <i class="todo-handle opacity-25 hover:opacity-75" />
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
    body: Array
  },
  data: function() {
    return {
      todoList: this.body
    };
  },
};
</script>

<style>
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
  height: 16px;
  width: 16px;
  background: no-repeat url("/img/icons/drag_indicator.svg");
  background-size: 16px 16px;
}
.todo-ghost {
  opacity: 0.2;
}
</style>