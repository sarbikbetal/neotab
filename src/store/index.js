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
                        { id: 2, title: "Heroku", url: "https://dashboard.heroku.com/apps" }
                    ]
                }
            ],
            [
                { id: 7, type: "note", title: "Zazam", text: "And I am a lote!" },
            ]
        ],
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
                    return state.cardData[i][cardIndex].title = title;
                }
            }
        },
        updateNote(state, { id, note }) {
            for (let i = 0; i < state.cardData.length; i++) {
                const cards = state.cardData[i];
                let cardIndex = cards.findIndex(card => card.id == id);
                if (cardIndex != -1) {
                    return state.cardData[i][cardIndex].text = note;
                }
            }
        }
    }
})