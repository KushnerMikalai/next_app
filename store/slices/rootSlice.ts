import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../store'

export interface RootState {
    pageLoader: boolean
}

const initialState: RootState = {
    pageLoader: false,
}

export const rootSlice = createSlice({
    name: 'rootSlice',
    initialState,
    reducers: {
        showPageLoader: (state) => {
            state.pageLoader = true
        },
        hidePageLoader: (state) => {
            state.pageLoader = false
        }
    }
})

export const { showPageLoader, hidePageLoader } = rootSlice.actions
export const selectPageLoader = (state: AppState) => state.root.pageLoader

export default rootSlice.reducer