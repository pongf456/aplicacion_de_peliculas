import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { searchAll } from "../APIS/themovieDB"
import { Loading } from "../components/loading"
import { baseSearch, movie, sectionType, tv } from "../interfaces"
import { MoviePreview } from "../components/MoviePreview"
import { TvPreview } from "../components/TvPreview"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Helmet } from "react-helmet"

const SearchPage = () =>{
    const {ref,inView} = useInView()
    const {search} = useParams()
    const {data,isLoading,fetchNextPage,hasNextPage} = useInfiniteQuery({
        queryKey:["search",search],
        initialPageParam:1,
        queryFn:({pageParam = 1}) => searchAll(search as string,pageParam),
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
        if(!isLoading && inView && hasNextPage){
            fetchNextPage()
        }
    },[inView])
    return <div className="w-full h-full flex flex-wrap justify-center overflow-auto">
        <Helmet>
            <title>{import.meta.env.VITE_PROJECT_NAME + ` - ${search}`}</title>
            <meta name="description" content="simple search" />
            <meta name="keywords" content={search} />
            <meta name="author" content="PongfZT" />
            <meta property="og:title" content={import.meta.env.VITE_PROJECT_NAME + ` - ${search}`} />
            <meta property="og:description" content="simple search" />
            <meta property="og:url" content={location.href} />
        </Helmet>
    {isLoading && (<Loading></Loading>)}
    {!isLoading && data?.pages.map((page => (
        (page.results as baseSearch[]).map((searchItem,index) => {
            if(searchItem.media_type == sectionType.movie){
                return <MoviePreview movie={searchItem as movie} key={index}></MoviePreview>
            }
            else if(searchItem.media_type == sectionType.tv) {
                return <TvPreview Tv={searchItem as tv} key={index}></TvPreview>
            }
        })
    )))}
    {!isLoading && (data?.pages[0].results as any[]).length == 0 && (
        <span className="font-Dmsans font-bold text-white-100 m-10">Not found</span>
    )}
    {!isLoading && (
        <div ref={ref} className="w-full relative m-10">
            <Loading></Loading>
        </div>
    )}
    </div>
}
export default SearchPage