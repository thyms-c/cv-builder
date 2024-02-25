import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { deepMerge } from "../deep-merge"
import { initialCvState, setCv } from "./cv-slice"
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./local-storage"
import { Settings, initialSettings, setSettings } from "./settings-slice"
import { AppDispatch, RootState, store } from "./store"
import { Cv } from "./types"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState())
    })
    return unsubscribe
  }, [])
}

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const state = loadStateFromLocalStorage()
    if (!state) return
    if (state.cv) {
      const mergedCvState = deepMerge(initialCvState, state.cv) as Cv
      dispatch(setCv(mergedCvState))
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings,
      ) as Settings
      dispatch(setSettings(mergedSettingsState))
    }
  }, [])
}
