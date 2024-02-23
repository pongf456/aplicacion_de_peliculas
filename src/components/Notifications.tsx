
import { useNotifications } from "../store/useNotifications"
import {motion,AnimatePresence} from 'framer-motion'
export const Notifications = () =>{
    const {notifications} = useNotifications()
    return  <AnimatePresence>
    {notifications.map((element,index) => (
        <motion.div 
        initial={{scale:0,opacity:.4,x:-10}}
        animate={{scale:1,opacity:1, x:10}}
        exit={{opacity:0}}
        key={index} className="w-80 h-12 p-1 bg-bunker-950 m-2 rounded-sm shadow-sm shadow-abbey-950 flex items-center  flex-col z-50">
            <span className=" font-Dmsans text-ship-cove-100 text-sm">
                {element.title}
            </span> 
            <span className=" w-full font-Dmsans text-xs py-1 text-ship-cove-300 truncate">
                {element.data}
            </span>
        </motion.div>
    ))}
    </AnimatePresence>
}