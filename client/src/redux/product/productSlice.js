import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    product: null,
    error: false
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProductOnStart : (state) => {
            state.loading = true
        },
        addProductOnSucess: (state, action) => {
            state.loading = false,
            state.product = action.payload
        },
        addProductOnFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        }
    }
})

export default productSlice.reducer

const {addProductOnStart, addProductOnSucess, addProductOnFailure} = productSlice.actions

