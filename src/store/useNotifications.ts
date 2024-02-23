import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store"
import { notifications } from "../interfaces"
import { deleteNotificate, notificate } from "./sliceUser"

export const useNotifications = () =>{
    const notifications = useSelector((state:RootState) => state.user.notifications)
    const dispatch = useDispatch()
    const addNotification = (notification:notifications) => {
        dispatch(notificate(notification))
        setTimeout(() => {
            dispatch(deleteNotificate())
        }, 3000)
    }
    return {notifications,addNotification}
}