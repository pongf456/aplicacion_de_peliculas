import { useInfiniteQuery } from "@tanstack/react-query"
import { getMoviePopular, getMovieTopRated, getTvPopular, getTvTopRated } from "../APIS/themovieDB"
import { Carrousel } from "../components/carrousel"
import { movie, tv } from "../interfaces"
import { MoviePreview } from "../components/MoviePreview"
import { useEffect, useState } from "react"
import { TvPreview } from "../components/TvPreview"
import { Helmet } from "react-helmet"

const TopRated = () => {
    const {data,isLoading,fetchNextPage} = useInfiniteQuery({
        queryKey:["pelis TopRated"],
        initialPageParam:1,
        queryFn: ({pageParam = 1}) => getMovieTopRated(pageParam),
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages) {
                return lastPage.page as number + 1
            }
            else {
                return (undefined)
            }
        }
    })
    const [topMovies,setTopMovies] = useState<movie[]>([])
    useEffect(()=>{
        const thisMovies:movie[] = []
        data?.pages.map(
            (page) => {
                (page.results as movie[]).map(
                    (movie) => {
                        thisMovies.push(movie)
                    }
                )
            }
        )
        setTopMovies(thisMovies)
    },[data])


    const tvInfiniteQuery = useInfiniteQuery({
        queryKey:["Tv TopRated"],
        initialPageParam:1,
        queryFn: ({pageParam = 1}) => getTvTopRated(pageParam),
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages) {
                return lastPage.page as number + 1
            }
            else {
                return (undefined)
            }
        }
    })
    const [topTv,setTopTv] = useState<tv[]>([])
    useEffect(()=>{
        const thisTv:tv[] = []
        tvInfiniteQuery.data?.pages.map(
            (page) => {
                (page.results as tv[]).map(
                    (tv) => {
                        thisTv.push(tv)
                    }
                )
            }
        )
        setTopTv(thisTv)
    },[tvInfiniteQuery.data])

    const moviePopularQuery = useInfiniteQuery({
        queryKey:["Movie Popular"],
        initialPageParam:1,
        queryFn: ({pageParam = 1}) => getMoviePopular(pageParam),
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages) {
                return lastPage.page as number + 1
            }
            else {
                return (undefined)
            }
        }
    })
    const [popularMovie,setPopularMovie] = useState<movie[]>([])
    useEffect(()=>{
        const thisMovie:movie[] = []
        moviePopularQuery.data?.pages.map(
            (page) => {
                (page.results as movie[]).map(
                    (movie) => {
                        thisMovie.push(movie)
                    }
                )
            }
        )
        setPopularMovie(thisMovie)
    },[moviePopularQuery.data])

    const tvPopularQuery = useInfiniteQuery({
        queryKey:["Tv Popular"],
        initialPageParam:1,
        queryFn: ({pageParam = 1}) => getTvPopular(pageParam),
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages) {
                return lastPage.page as number + 1
            }
            else {
                return (undefined)
            }
        }
    })
    const [popularTv,setPopularTv] = useState<tv[]>([])
    useEffect(()=>{
        const thisTv:tv[] = []
        tvPopularQuery.data?.pages.map(
            (page) => {
                (page.results as tv[]).map(
                    (tv) => {
                        thisTv.push(tv)
                    }
                )
            }
        )
        setPopularTv(thisTv)
    },[tvPopularQuery.data])

    return <>
        <Helmet>
            <title>{import.meta.env.VITE_PROJECT_NAME + ` - Top rated`}</title>
            <meta name="description" content="simple search" />
            <meta name="keywords" content="Popular, recents" />
            <meta name="author" content="PongfZT" />
            <meta property="og:title" content={import.meta.env.VITE_PROJECT_NAME + ` - Top rated`} />
            <meta property="og:description" content="Movies, series popular" />
            <meta property="og:url" content={location.href} />
        </Helmet>
    <div className="w-full h-12 flex items-center justify-center">
        <span className="font-Dmsans text-cyan-50 text-5xl bg-gradient-to-t from-zinc-400 to-slate-400 text-transparent bg-clip-text"><i className="bi bi-badge-hd"></i></span>
    </div>
    <div  className="w-full h-[calc(100%-3rem)] overflow-auto flex flex-col items-center justify-center flex-wrap">
    <Carrousel nextPage={fetchNextPage} title="Movies top rated">
        {!isLoading ?  ( 
            topMovies.map((movie,index)=> (
                <MoviePreview key={index} movie={movie}></MoviePreview>
            ))
        ):undefined}
        
    </Carrousel>
    <Carrousel nextPage={tvInfiniteQuery.fetchNextPage} title="Series top rated">
        {!isLoading ?  ( 
            topTv.map((tv,index)=> (
                <TvPreview Tv={tv} key={index}></TvPreview>
            ))
        ):undefined}
        
    </Carrousel>
    <Carrousel nextPage={moviePopularQuery.fetchNextPage} title="Movies popular">
        {!isLoading ?  ( 
            popularMovie.map((movie,index)=> (
                <MoviePreview movie={movie} key={index}></MoviePreview>
            ))
        ):undefined}
        
    </Carrousel>
    <Carrousel nextPage={tvPopularQuery.fetchNextPage} title="Series popular">
        {!isLoading ?  ( 
            popularTv.map((tv,index)=> (
                <TvPreview Tv={tv} key={index}></TvPreview>
            ))
        ):undefined}
    </Carrousel>
    </div>
    </>
}
export default TopRated