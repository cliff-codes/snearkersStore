import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import storeReducer from "./store/storeSlice"
import productReducer from "./product/productSlice"

import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
    user: userReducer,
    store: storeReducer,
    product: productReducer
})

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)