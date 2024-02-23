import {motion} from 'framer-motion'
import { useState } from 'react'
export const Carrousel = ({children,nextPage,title}:{children?:JSX.Element[],nextPage:any,title:string}) => {
    if(children) {
        const [index,setIndex] = useState(0)
        const next = () => {
            if(index < children.length -1) {
                setIndex(index + 1)
            }
            else {
                nextPage()
            }
        }
        const back = () => {
            if(index - 1 < 0) {
                setIndex(children.length - 1)
            }
            else {
                setIndex(index -1)
            }
        }
        return <div className="w-9/12 mx-[12%] flex items-center justify-center flex-col md:mx-0 md:w-96 h-min">
            <p className='font-Dmsans font-semibold text-center text-white-200'>{title}</p>
            <motion.div 
            className="w-min flex items-center justify-center h-min relative">
                {children[index]}
            <button onClick={()=> next()} className='hover:scale-150 transition-all absolute -right-3 text-white-100 text-3xl'><i className="bi bi-chevron-right"></i></button>
            <button onClick={()=> back()} className='hover:scale-150 transition-all absolute -left-3 text-white-100 text-3xl'><i className="bi bi-chevron-left"></i></button>
            </motion.div>
        </div>
    }
    else return <></>

}