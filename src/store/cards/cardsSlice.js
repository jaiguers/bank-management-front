import { createSlice } from '@reduxjs/toolkit';


export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        isLoadingEvents: true,
        cards: [],
        banks: [],
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
            state.statusCode = payload;
        },
        onUpdateCard: (state, { payload }) => {
            state.statusCode = payload;
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
        onLoadbanks: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(bank => {
                const exists = state.banks.some(dbBank => dbBank.id === bank.id);
                if (!exists) {
                    state.banks.push(bank)
                }
            })
        },
        onMakeTransaction: (state, { payload }) => {
            state.statusCode = payload;
        },
        onLogoutCards: (state) => {
            state.isLoadingEvents = true
            state.cards = []
            state.banks = []
            state.activeEvent = null
            state.statusCode = undefined
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
    onLoadbanks,
} = cardsSlice.actions;