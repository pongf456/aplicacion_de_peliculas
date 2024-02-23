
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store"
import { currentUser } from "../interfaces"
import { login, logout } from "./sliceUser"

export const useMainUser = () => {
    const user = useSelector((state:RootState) => state.user.currentUser)
    const dispatch = useDispatch()
    const set = (user:currentUser) =>{
        dispatch(login(user))
    }
    const unset = () => {
        dispatch(logout())
    }
    return {user,set,unset}
}