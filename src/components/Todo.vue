<template>
  <div class="relative pb-3 mt-1">
    <draggable
      v-model="todoList"
      group="todos"
      @start="drag=true"
      @end="drag=false"
      handle=".todo"
      ghost-class="todo-ghost"
    >
      <transition-group name="todo" tag="div" @after-enter="setFocus">
        <div v-for="todo in todoList" :key="todo.id" class="flex items-start">
          <input
            type="checkbox"
            :checked="todo.done"
            @click="markTodo($event, todo.id)"
            class="opacity-50 cursor-pointer h-4 w-4 mt-1"
          />
          <p
            @keydown.enter="addTodo($event, true)"
            @keydown.esc="setBlur"
            @keydown.delete="checkToRemove($event, todo.id)"
            @dblclick="makeEditable"
            @contextmenu="makeEditable"
            @blur="updateTodo($event, todo.id)"
            spellcheck="false"
            :class="todo.done ? 'line-through text-gray-600' : 'no-underline'"
            class="todo flex-1 focus:outline-none focus:bg-gray-200 focus:cursor-text"
          >{{todo.text}}</p>
          <i @click="removeTodo($event, todo.id)" class="remove opacity-25 hover:opacity-100" />
        </div>
      </transition-group>
    </draggable>
    <fab class="mr-2 focus:bg-gray-300" @click.native="addTodo">
      <div class="add-todo-btn select-none" />
    </fab>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import fab from "@/components/Fab";
export default {
  name: "todo",
  components: {
    draggable,
    fab,
  },
  props: {
    cardId: Number,
    body: Array,
  },
  computed: {
    todoList: {
      get() {
        return this.body;
      },
      set(list) {
        this.$store.commit("reorderTodo", {
          id: this.cardId,
          todoList: list,
        });
      },
    },
  },
  methods: {
    addTodo(e, check) {
      if (check && e.target.innerText.length == 0) {
        e.preventDefault();
        return;
      }
      this.$store.commit("addTodo", {
        id: this.cardId,
      });
      e.target.blur();
    },
    updateTodo(e, id) {
      if (e.target.innerText.length == 0) {
        this.removeTodo(e, id);
      } else {
        this.$store.commit("updateTodo", {
          id: this.cardId,
          todoId: id,
          todo: e.target.innerText.trim(),
        });
        this.removeEditable(e);
      }
    },
    markTodo(e, id) {
      this.$store.commit("markTodo", {
        id: this.cardId,
        todoId: id,
      });
    },
    removeTodo(e, id) {
      this.$store.commit("removeTodo", {
        id: this.cardId,
        todoId: id,
      });
    },
    checkToRemove(e, id) {
      if (e.target.innerText.length == 0) {
        this.setFocus(e.target.parentElement.previousElementSibling);
        this.removeTodo(e, id);
        return true;
      }
      return false;
    },
    setBlur(e) {
      e.target.blur();
    },
    makeEditable(e) {
      e.stopPropagation();
      e.target.contentEditable = true;
      e.target.focus();
    },
    removeEditable(e) {
      e.target.contentEditable = false;
    },
    setFocus(el) {
      let todo = el.children[1];
      todo.contentEditable = true;
      todo.focus();
    },
  },
};
</script>

<style>
.add-todo-btn {
  height: 24px;
  width: 24px;
  background: no-repeat url("/img/icons/add.svg");
  background-size: 24px 24px;
}
.todo {
  @apply rounded-sm;
  @apply break-all;
  @apply text-gray-800;
  @apply pl-1;
  @apply ml-1;
  min-height: 24px;
  transition: all 300ms;
}
.todo[contenteditable="true"] {
  @apply bg-gray-200;
}
.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s;
}
.todo-enter {
  opacity: 0.1;
}
.todo-leave-to {
  opacity: 0;
}
.todo-leave {
  opacity: 1;
}
.todo-move {
  transition: transform 0.2s;
}

.todo-ghost {
  opacity: 0.2;
}

.remove {
  cursor: pointer;
  margin: 6px 4px;
  height: 16px;
  width: 16px;
  background: no-repeat url("/img/icons/remove.svg");
  background-size: 16px 16px;
}
</style>