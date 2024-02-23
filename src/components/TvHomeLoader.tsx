import { useInfiniteQuery } from "@tanstack/react-query"
import { getTv, getTvGenres } from "../APIS/themovieDB"
import { Loading } from "../components/loading"
import { tv } from "../interfaces"
import { AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { TvPreview } from "./TvPreview"
import { Genres } from "./genres"
export const TvHomeLoader = () => {
    const { ref, inView } = useInView();
    const [genre,SetGenre] = useState<number | undefined>()
    const {data,isLoading,fetchNextPage,hasNextPage} = useInfiniteQuery({
        queryKey:["tv_list",genre],
        initialPageParam:1,
        queryFn:({ pageParam = 1 }) => getTv(pageParam,genre),
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages) {
                return lastPage.page as number + 1
            }
            else {
                return (undefined)
            }
        }
    })
    useEffect(()=>{
        if(inView && !isLoading && hasNextPage){
            fetchNextPage()
        }
    },[inView])
    
    return <>
    <AnimatePresence>
        {isLoading && (
                <Loading></Loading>
        )}
    </AnimatePresence>

        {!isLoading && (
        
        <div className="w-full h-full flex flex-wrap justify-center overflow-auto">
            <Genres select={SetGenre} queryFn={getTvGenres} GenreType="GenreTv"/>
            {
            data?.pages.map((page)=>(
            (page.results as tv[]).map((resource,index)=> (
                <TvPreview Tv={resource} key={index}></TvPreview>
            ))
        ))
        }
        <div className="relative w-full h-12" ref={ref}>
            <Loading></Loading>
        </div>
        </div>
        )}
    </>
}