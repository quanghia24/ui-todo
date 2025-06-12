'use client'

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import userReducer from "@/lib/features/users/userSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) { 
    return <Provider store={store}>{children}</Provider>
}

export type UserStateType = ReturnType<typeof store.getState>