import { configureStore, createSlice } from '@reduxjs/toolkit'

const userInfoState = createSlice({
    name: 'userInfoState',
    initialState: {
        userID: '', userPW: ''
    },
    reducers: {
        setUserInfo(state, action) {
            const ID = action.payload.ID
            const PW = action.payload.PW

            state.userID = ID
            state.userPW = PW
        }
    }
})


export const { setUserInfo } = userInfoState.actions

export default configureStore({
    reducer:{
        userInfoState: userInfoState.reducer
    }
})