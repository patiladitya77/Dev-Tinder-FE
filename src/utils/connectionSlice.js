import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: () => {
            return null;
        }

    }
});

export const { removeConnection, addConnection } = connection.actions;
export default connection.reducer;