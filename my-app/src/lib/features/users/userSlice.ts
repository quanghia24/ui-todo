import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: 'user',
    initialState: { userId: null },
    reducers: {
        setUser(state, action) {
            state.userId = action.payload.userId;
        },
        clearUser(state) {
            state.userId = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

