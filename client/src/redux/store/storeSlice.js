import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentStore: null,
    error: false
}

export const storeSlice = createSlice({
    name: 'storeSlice',
    initialState,
    reducers: {
        createStoreStart: (state) => {
            state.loading = true
        },
        createStoreSuccess: (state, action) => {
            state.loading = false
            state.currentStore = action.payload
        },
        createStoreFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {createStoreFailure, createStoreStart, createStoreSuccess} = storeSlice.actions

export default storeSlice.reducer
