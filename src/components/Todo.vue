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
            class="opacity-50 cursor-pointer h-4 w-4 mt-1 ml-1"
          />
          <p
            @keydown.enter="addTodo($event, true)"
            @keydown.esc="setBlur"
            @keydown.delete="checkToRemove($event, todo.id)"
            @dblclick="makeEditable"
            @contextmenu="makeEditable"
            @blur="updateTodo($event, todo.id)"
            spellcheck="false"
            :class="todo.done ? 'line-through done' : 'no-underline'"
            class="todo flex-1"
          >{{todo.text}}</p>
          <i @click="removeTodo($event, todo.id)" class="remove opacity-75 hover:opacity-100" />
        </div>
      </transition-group>
    </draggable>
    <fab class="mr-2 fab-add-btn" @click.native="addTodo">
      <svg class="add-todo-btn select-none" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          fill="var(--text-light)"
          d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
        />
      </svg>
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
.fab-add-btn {
  @apply absolute;
  bottom: -36px;
  right: 2%;
}
.add-todo-btn {
  height: 24px;
  width: 24px;
}
.todo {
  @apply rounded-sm;
  @apply break-all;
  @apply pl-2;
  @apply ml-1;
  color: var(--text);
  min-height: 24px;
  transition: all 300ms;
}
.todo.done {
  color: var(--text-light);
}
.todo:focus {
  @apply cursor-text;
  @apply outline-none;
  background-color: var(--primary);
}
.todo[contenteditable="true"] {
  background-color: var(--primary);
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