import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/features/userSlice'
import seatReducer from "../redux/features/bookingSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist:['user']
  }

  const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user :  persistedReducer,
    booking: seatReducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor=persistStore(store)