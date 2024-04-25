import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice, cardsSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        card: cardsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
