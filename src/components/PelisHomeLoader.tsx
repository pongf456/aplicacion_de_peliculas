import { useInfiniteQuery } from "@tanstack/react-query"
import { getMovieGenres, getMovies } from "../APIS/themovieDB"
import { Loading } from "../components/loading"
import { movie } from "../interfaces"
import { MoviePreview } from "../components/MoviePreview"
import { AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Genres } from "./genres"
export const PelisHomeLoader = () => {
    const { ref, inView} = useInView();
    const [genre,SetGenre] = useState<number | undefined>()
    const {data,isLoading,fetchNextPage,hasNextPage} = useInfiniteQuery({
        queryKey:["movie_list",genre],
        initialPageParam:1,
        queryFn:({ pageParam = 1 }) => getMovies(pageParam,genre),
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
            <Genres select={SetGenre} queryFn={getMovieGenres} GenreType="GenreMovies"/>
            {
            data?.pages.map((page)=>(
            (page.results as movie[]).map((resource,index)=> (
                <MoviePreview movie={resource} key={index}></MoviePreview>
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