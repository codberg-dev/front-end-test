import { configureStore, createSlice } from '@reduxjs/toolkit'

const userInfoState = createSlice({
    name: 'userInfoState',
    initialState: {
        userID: '', userPW: ''
    },
    reducers: {
        setUserInfo(state, action) {
            const id = action.payload.id
            const pw = action.payload.pw

            state.userID = id
            state.userPW = pw
        }
    }
})


export const { setUserInfo } = userInfoState.actions

export default configureStore({
    reducer:{
        userInfoState: userInfoState.reducer
    }
})