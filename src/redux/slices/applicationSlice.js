import { createSlice } from "@reduxjs/toolkit";

const initialState={
    applicant:[]
}

const applicationSlice = createSlice({
    name:"application",
    initialState,
    reducers:{
        setAllApplicants:(state, action)=>{
            state.applicant = action.payload
    }
}
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;