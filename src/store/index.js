import Vuex, { Store } from 'vuex';
import Vue from 'vue';

const saveStateLocal = store => {
    store.subscribe((mutation, state) => {
        const stateString = JSON.stringify(state);
        window.localStorage.setItem('app-state', stateString);
    });
}

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
                        { id: 1, title: "Github", url: "https://github.com" },
                        { id: 2, title: "Dev Community", url: "https://dev.to" }
                    ]
                }
            ],
            [
                { id: 3, type: "note", title: "Note", text: " " },
            ],
            []
        ],
        counters: [4, 8],
        columns: [0, 1, 2],
        theme: "Dark",
        searchEngine: {
            name: "DuckDuckGo",
            url: "https://duckduckgo.com/?q=",
            icon: "https://duckduckgo.com/favicon.ico",
        },
        favSites: [
            { key: 0, url: "https://medium.com" },
        ],
    },
    mutations: {
        //Overwrite app state
        initialiseStore(state, savedState) {
            console.log("Restoring saved state");
            this.replaceState(Object.assign(state, savedState));
            state = savedState;
        },
        // Set theme
        setTheme(state, theme) {
            state.theme = theme;
        },
        // Set search engine
        setSearchEngine(state, searchEngine) {
            state.searchEngine = searchEngine;
        },
        // FavBar sites
        addFavSite(state, url) {
            state.favSites.push({
                key: state.counters[1]++,
                url,
            });
        },
        reorderFavs(state, { list }) {
            state.favSites = list;
        },
        deleteFav(state, favId) {
            state.favSites = state.favSites.filter(fav => fav.key != favId);
        },
        // Columns
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
        // All cards
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
        addNoteCard(state) {
            state.cardData[state.columns.length - 1].unshift({ id: state.counters[0]++, type: "note", title: "Note", text: " " })
        },
        addTodoCard(state) {
            state.cardData[state.columns.length - 1].unshift({
                id: state.counters[0]++,
                type: "todo",
                title: "Todo",
                body: []
            })
        },
        addBookmarkCard(state) {
            state.cardData[state.columns.length - 1].unshift({
                id: state.counters[0]++,
                type: "bookmark",
                title: "Bookmarks",
                body: []
            })
        },
        reorderCards(state, { list, col }) {
            let newData = state.cardData;
            newData[col] = list;
            state.cardData = newData;
        },
        deleteCard(state, { id }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    let newCardList = cards.filter(card => card.id != id);
                    Vue.set(state.cardData, i, newCardList);
                    break;
                }
            }
        },
        // Notes
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
        // Todos
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
        },
        // Bookmarks
        addBookmark(state, { id, title, url }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].body.push(
                        { id: state.counters[1]++, title, url }
                    );
                    break;
                }
            }
        },
        updateBookmark(state, { id, title, url, bkmId }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    const bkmList = state.cardData[i][cardIndex].body;
                    let bkmIndex = bkmList.findIndex(bkm => bkm.id == bkmId);
                    if (bkmIndex != -1) {
                        state.cardData[i][cardIndex].body[bkmIndex] = { id: bkmId, title, url };
                        break;
                    }
                }
            }
        },
        deleteBookmark(state, { id, title, url, bkmId }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    const bkmList = state.cardData[i][cardIndex].body;
                    let newList = bkmList.filter(bkm => bkm.id != bkmId);
                    state.cardData[i][cardIndex].body = newList;
                }
            }
        },
        reorderBookmark(state, { id, bkmList }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    state.cardData[i][cardIndex].body = bkmList;
                    break;
                }
            }
        },
    },
    plugins: [saveStateLocal]
})