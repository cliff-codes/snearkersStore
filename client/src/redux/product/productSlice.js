import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    product: null,
    error: false,
    dataLoading: false,
    data: null,
    dataFailure: false
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
        },
        fetchProductStart: (state) => {
            state.dataLoading = true
        },
        fetchProductSucess: (state, action) => {
            state.dataLoading = false
            state.data = action.payload
        },
        fetchProductFailure: (state, action) => {
            state.dataLoading = false
            state.dataFailure = action.payload
        }
    }
})

export default productSlice.reducer

export const {addProductOnStart, addProductOnSucess, addProductOnFailure, fetchProductStart, fetchProductSucess, fetchProductFailure} = productSlice.actions

