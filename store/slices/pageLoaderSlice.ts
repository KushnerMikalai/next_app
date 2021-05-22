import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../store'

export interface PageLoaderState {
    value: boolean
}

const initialState: PageLoaderState = {
    value: false,
}

export const pageLoaderSlice = createSlice({
    name: 'pageLoader',
    initialState,
    reducers: {
        show: (state) => {
            state.value = true
        },
        hide: (state) => {
            state.value = false
        }
    }
})

export const {show, hide} = pageLoaderSlice.actions
export const selectPageLoader = (state: AppState) => state.pageLoader.value

export default pageLoaderSlice.reducer