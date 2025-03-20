import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        }
    }
});


export const { addRequest } = requestsSlice.actions;
export default requestsSlice.reducer;