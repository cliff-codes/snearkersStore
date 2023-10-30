import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser : null,
    loading: false,
    error: false,
    expirationTime: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false,
            state.expirationTime = Date.now() + (24 * 60 * 60 * 1000)
        },
        signInFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        clearUserState: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = false,
            state.expirationTime = null
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, clearUserState} = userSlice.actions

export default userSlice.reducer