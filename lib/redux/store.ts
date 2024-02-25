import { configureStore } from "@reduxjs/toolkit"
import cvReducer from "./cv-slice"
import settingsReducer from "./settings-slice"

export const store = configureStore({
  reducer: {
    cv: cvReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
