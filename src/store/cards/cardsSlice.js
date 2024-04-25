import { createSlice } from '@reduxjs/toolkit';


export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        isLoadingEvents: true,
        cards: [
            // tempEvent
        ],
        activeEvent: null,
        statusCode: undefined
    },
    reducers: {
        onSetActiveCard: (state, { payload }) => {
            state.activeEvent = payload;
            state.statusCode = undefined
        },
        onAddNewCard: (state, { payload }) => {
            state.cards.push(payload);
            state.activeEvent = null;
            state.statusCode = undefined;
        },
        onUpdateCard: (state, { payload }) => {
            state.statusCode = undefined;
            state.cards = state.cards.map(card => {
                if (card.id === payload.id) {
                    return payload;
                }

                return card;
            });
        },
        onDeleteCard: (state) => {
            state.statusCode = undefined;
            if (state.activeEvent) {
                state.cards = state.cards.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadTransaction: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(card => {
                const exists = state.cards.some(dbEvent => dbEvent.id === card.id);
                if (!exists) {
                    state.cards.push(card)
                }
            })
        },
        onLogoutCards: (state) => {
            state.isLoadingEvents = true,
                state.cards = []
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewCard,
    onDeleteCard,
    onLoadTransaction,
    onLogoutCards,
    onSetActiveCard,
    onUpdateCard,
} = cardsSlice.actions;