import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, action)=>{
            state.user = action.payload
        },
        setLogOut: (state, action)=>{
            state.user = action.payload;
        }
    }
});
export const {setUser, setLogOut} = authSlice.actions;
export default authSlice.reducer;