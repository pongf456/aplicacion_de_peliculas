import {useState } from "react"
import { sectionType } from "../interfaces"
import { PelisHomeLoader } from "../components/PelisHomeLoader"
import {Helmet} from "react-helmet";
import { TvHomeLoader } from "../components/TvHomeLoader"
export const Home = () =>{
    const [section,setSection] = useState(sectionType.movie)
    return <>
        <Helmet>
            <title>{import.meta.env.VITE_PROJECT_NAME + " - home"}</title>
            <meta name="description" content="The pongf project to watch movies" />
            <meta name="keywords" content="Movies, Tv" />
            <meta name="author" content="PongfZT" />
            <meta property="og:type" content="website"></meta>
            <meta property="og:title" content= {import.meta.env.VITE_PROJECT_NAME + " - home"} />
            <meta property="og:description" content="The pongf project to watch movies" />
            <meta property="og:url" content={location.href} />
        </Helmet>
        <div className="w-full h-[8%] flex items-center  justify-center">
            <span onClick={()=> setSection(sectionType.movie)} className={` cursor-pointer transition-all m-4 w-20 font-Dmsans font-semibold text-center text-xl text-white-100 border-b-2  border-bunker-200/0 ${section == sectionType.movie ? "border-bunker-200/100": ""}`}>Movies</span>
            <span onClick={()=> setSection(sectionType.tv)} className={` cursor-pointer transition-all  m-4 w-20 font-Dmsans font-semibold text-center text-xl text-white-100 border-b-2 border-bunker-200/0 ${section == sectionType.tv ? "border-bunker-200/100": ""}`}>Series</span>
        </div>
        <div className="w-full h-[92%] ">
            {section == sectionType.movie && (
            <>
                <PelisHomeLoader></PelisHomeLoader>
            </>
            )}
            {section == sectionType.tv && (
            <>
                <TvHomeLoader></TvHomeLoader>
            </>
            )}
        </div>
    </>
}