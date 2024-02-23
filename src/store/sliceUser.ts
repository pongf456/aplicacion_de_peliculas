import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { currentUser, notifications } from "../interfaces"

interface sliceUser  {
    notifications: notifications[]
    currentUser: currentUser | undefined
}
const initialValue:sliceUser = {
    currentUser:undefined,
    notifications:[]
}
export const sliceUser = createSlice({
    initialState:initialValue,
    name:"main_user",
    reducers:{
        login:(state,action:PayloadAction<currentUser>) => {
            state.currentUser = action.payload
        },
        logout: (state)  => {
            state.currentUser = undefined
        },
        notificate: (state,action:PayloadAction<notifications>) => {
            state.notifications.push(action.payload)
        },
        deleteNotificate: (state) => {
            state.notifications.shift()
        }
    }
})
export const {login,logout,notificate,deleteNotificate} = sliceUser.actions
export default sliceUser.reducer