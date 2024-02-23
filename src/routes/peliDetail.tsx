import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getMovieById } from "../APIS/themovieDB"
import { Loading } from "../components/loading"
import { movieDetails } from "../interfaces"
import { Helmet } from "react-helmet"

const PeliDetail = () => {
    const {id} = useParams()
    const {data, isLoading} = useQuery({
        queryKey:["peliDetail",id],
        select:(data) => (data as movieDetails),
        queryFn:() => getMovieById(Number.parseInt(id as string))
    })
    return <>
     {isLoading && (
        <Loading></Loading>
     )}
     {!isLoading && (<>
        <Helmet>
            <title>{import.meta.env.VITE_PROJECT_NAME + ` - ${data?.title}`}</title>
            <meta name="description" content={data?.overview.substring(0,170)} />
            <meta name="keywords" content={data?.genres.map((genre) => `${genre.name}`).join(",")} />
            <meta name="author" content="PongfZT" />
            <meta property="og:type" content="website"></meta>
            <meta property="og:title" content={import.meta.env.VITE_PROJECT_NAME + ` - ${data?.title}`} />
            <meta property="og:description" content={data?.overview.substring(0,50)} />
            <meta property="og:image" content={`https://image.tmdb.org/t/p/original${data?.poster_path}`} />
            <meta property="og:url" content={location.href} />
        </Helmet>
        <div className="w-full h-full relative flex items-center justify-center">
            <img src={data?.backdrop_path ? `https://image.tmdb.org/t/p/original${data?.backdrop_path}`:"/background_default.jpg"} className="w-full h-full object-cover absolute opacity-20"/>
            <div className="w-full md:w-3/5 h-full absolute z-10 flex flex-col items-center overflow-y-auto">
                <img src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} className="max-w-72 rounded-md m-4" />
                <p className="font-Dmsans px-4 font-bold text-center text-slate-50">{data?.title}</p>
                <p className="font-Dmsans px-4 font-bold my-2 text-center text-slate-100">({data?.original_title})</p>
                <div className="w-full flex items-center justify-center flex-wrap">
                    {data?.genres.map((genre,index) => (
                        <div key={index} className="font-Dmsans font-semibold text-slate-200 rounded-md  m-2 bg-cyan-800 p-1"><i className="bi bi-bookmark"></i> {genre.name}</div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                    <span className="font-Dmsans text-white-100 bg-bunker-950 p-2 m-2  rounded-md"><i className="bi bi-translate"></i> {data?.original_language}</span>
                    <span className="font-Dmsans text-white-100 bg-bunker-950 p-2 m-2  rounded-md"><i className="bi bi-stars"></i> {data?.popularity}</span>
                    <span className="font-Dmsans text-white-100 bg-bunker-950 p-2 m-2  rounded-md"><i className="bi bi-calendar-check"></i> {data?.release_date}</span>
                    <span className="font-Dmsans text-white-100 bg-bunker-950 p-2 m-2  rounded-md"><i className="bi bi-broadcast"></i> {data?.status}</span>
                </div>
                <p className="font-Dmsans font-medium text-white-200 p-4 md:px-40 text-justify ">
                        {data?.overview}
                </p>
                <div className="flex items-center justify-center flex-wrap">
                    {data?.production_companies.map((company)=>(
                        <div key={company.id} className="w-40 h-40 flex items-center justify-center m-2 flex-col">
                            <div className="w-full h-4/5 flex items-center justify-center">
                                <img src={company.logo_path ? `https://image.tmdb.org/t/p/original${company.logo_path}` : "/logo_default.png"} className="max-w-full max-h-full"/>
                            </div>
                            <span className="font-Dmsans font-medium text-sm text-white-100 truncate">{company.name}</span>
                        </div>
                    ))}
                </div>
                <a href={data?.homepage} className="font-Dmsans font-bold hover:bg-cyan-900 transition-all bg-cyan-800 px-6 py-2 m-4 text-white-100 rounded-md opacity-80 shadow-lg text-4xl"><i className="bi bi-hand-index"></i></a>
            </div>
        </div>
     </>)}
    </>
}
export default PeliDetail