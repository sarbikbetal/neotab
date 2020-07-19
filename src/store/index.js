import Vuex, { Store } from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Store({
    state: {
        cardData: [
            [
                {
                    id: 1,
                    type: "todo",
                    title: "Todo",
                    body: [
                        { id: 0, text: "This is a todo", done: true },
                        { id: 1, text: "This is another todo", done: false }
                    ]
                },
                {
                    id: 2,
                    type: "bookmark",
                    title: "Bookmarks",
                    body: [
                        { id: 1, title: "Duckduckgo", url: "https://duckduckgo.com" },
                        { id: 2, title: "Heroku", url: "https://dashboard.heroku.com/apps" }
                    ]
                }
            ],
            [
                { id: 7, type: "note", title: "Note", text: " " },
            ]
        ],
        counters: [9, 18],
        columns: [0, 1]
    },
    mutations: {
        increaseCols(state) {
            if (state.columns.length < 5)
                state.columns.push(state.columns.length);
            if (state.cardData.length < 5)
                state.cardData.push([]);

        },
        decreaseCols(state) {
            if (state.columns.length > 2) {
                state.columns.pop();
            }
        },
        updateTitle(state, { id, title }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].title = title;
                    break;
                }
            }
        },
        updateNote(state, { id, note }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].text = note;
                    break;
                }
            }
        },
        updateTodo(state, { id, todoId, todo }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    const todoList = state.cardData[i][cardIndex].body;
                    let todoIndex = todoList.findIndex(todo => todo.id == todoId);
                    if (todoIndex != -1) {
                        state.cardData[i][cardIndex].body[todoIndex].text = todo;
                        break;
                    }
                }
            }
        },
        markTodo(state, { id, todoId }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    const todoList = state.cardData[i][cardIndex].body;
                    let todoIndex = todoList.findIndex(todo => todo.id == todoId);
                    if (todoIndex != -1) {
                        let done = state.cardData[i][cardIndex].body[todoIndex].done;
                        state.cardData[i][cardIndex].body[todoIndex].done = !done;
                        break;
                    }
                }
            }
        },
        removeTodo(state, { id, todoId }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    const todoList = state.cardData[i][cardIndex].body;
                    let newList = todoList.filter(todo => todo.id != todoId);
                    state.cardData[i][cardIndex].body = newList;
                    break;
                }
            }
        },
        addTodo(state, { id }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].body.push(
                        {
                            id: state.counters[1]++,
                            text: " ",
                            done: false
                        }
                    );
                    break;
                }
            }
        },
        reorderTodo(state, { id, todoList }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].body = todoList;
                    break;
                }
            }
        }
    }
})