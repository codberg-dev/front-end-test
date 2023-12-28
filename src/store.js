import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'login',
    initialState : {
        id : '',
        pw : ''
    },
    reducers : {
        setCredentials : (state,action) => {
            const { id , pw } = action.payload;
            state.id = id;
            state.pw = pw;
        }
    }
})

export const {setCredentials} = user.actions;

export default configureStore({
    reducer : {
        user : user.reducer
    }
})