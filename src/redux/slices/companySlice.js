import { createSlice } from "@reduxjs/toolkit";

const initialState={
    companies:[],
    singleCompany:null
}

const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        setAllCompanies:(state, action)=>{
            state.companies = action.payload
        },
        setSingleCompany:(state, action)=>{
            state.singleCompany = action.payload
        },
        deleteCompany:(state, action)=>{
            state.companies = state.companies.filter(company=>company._id !== action.payload)
        }
    }
});
export const {setAllCompanies,setSingleCompany, deleteCompany} = companySlice.actions;
export default companySlice.reducer;