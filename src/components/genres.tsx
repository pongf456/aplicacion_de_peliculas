import { useQuery } from "@tanstack/react-query"
import {motion} from 'framer-motion'
import { useEffect, useRef, useState } from "react"
interface Genres {
    GenreType:string
    queryFn:() => any
    select:any
}
export const Genres = (genres:Genres) => {
    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(1)
    const query = useQuery({
        queryKey:[genres.GenreType],
        select:(data) => data.genres as {id:number, name:string}[],
        queryFn:genres.queryFn
    })
    const changeWidth = () => {
        if(ref.current) {
            setWidth(-(ref.current.scrollWidth - window.innerWidth))
        }
    }
    useEffect(()=> {
        window.addEventListener('resize',changeWidth)
        changeWidth()
    },[query])
    return <div className="w-full h-min flex overflow-hidden">
        <motion.div ref={ref}
        drag="x"
        dragConstraints={{
            right:0,
            left: width
        }}
        className=" w-min h-min flex items-center p-1 select-none">
            {!query.isLoading && query.data && (
                query.data.map((genre,index) => (
                    <div key={index} onClick={()=> genres.select(genre.id)} className="cursor-pointer font-Dmsans text-nowrap font-medium hover:bg-ship-cove-900 text-white-100 text-xs px-2 py-1 rounded-md m-1 h-min  bg-ship-cove-800">{genre.name}</div>
                ))
            )}
        </motion.div>
    </div>
}