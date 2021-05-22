import { configureStore, ThunkAction, Action, Store, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import counterReducer from '../features/counter/counterSlice'
import rootReducer from './slices/rootSlice'

const reducers = combineReducers({
    root: rootReducer,
    counter: counterReducer,
})

const makeStore = (): Store =>
    configureStore({
        reducer: reducers
    })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']

export type AppThunk = ThunkAction<void, AppState, null, Action<any>>
export const wrapper = createWrapper<AppStore>(makeStore)