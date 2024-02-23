import MediaQuery from "react-responsive"
import { Link, useNavigate } from "react-router-dom"
import { motion} from 'framer-motion'
import { useState } from "react"
import { Notifications } from "./Notifications"
import { useMainUser } from "../store/useMainUser"

const movileMenu = {
    closed:{
        scale:0,
        y:"-100%"
    },
    open:{
        scale:1,
        y:0
    }
}
export const Nav = () => {
    const [isMenuMobile, setMenuMobile] = useState(false)
    const [query,setQuery] = useState("")
    const navigate =useNavigate()
    const activeUser = useMainUser()
    const search = () =>{
        navigate(`/search/${query}`)
    }
    const onDown = (ev:React.KeyboardEvent<HTMLInputElement>) => {
        if(ev.key == "Enter") {
            search()
        }
    }
    return <>
    <MediaQuery minWidth={640}>
        <nav className="relative w-full h-12 bg-bunker-950 shadow-sm shadow-bunker-900    ">
            <ul  className="w-full h-full flex relative">
                <li className="w-2/12 font-Dmsans text-ship-cove-50 flex items-center justify-center text-2xl">
                    <span>TMBD                     <i className="bi bi-fast-forward-fill"></i></span>
                </li>
                <li className="w-3/6 flex items-center justify-center">
                    <input onKeyDown={onDown} type="text" onChange={(ev) => setQuery(ev.target.value)} className="w-3/4 p-1 peer outline-none font-Dmsans font-semibold text-sm rounded-sm bg-bunker-700 text-abbey-100 text-center" placeholder="write the name of a movie"/>
                    <button onClick={()=> search()} className="w-1/6 m-2 bg-gull-gray-900 text-sm p-1 text-ship-cove-100 font-Dmsans font-semibold hover:bg-bunker-900 transition-colors rounded-sm">search</button>
                </li>
                <li className="w-4/12 h-full flex items-center text-xs md:text-base justify-center font-Dmsans font-medium text-ship-cove-200">
                    <Link to="/" className=" mx-1 truncate hover:text-abbey-400 transition-colors duration-150">HOME</Link>
                    <Link to="/rated" className=" mx-1 truncate hover:text-abbey-400 transition-colors duration-150">DISCOVER</Link>
                    {activeUser.user? <span className=" mx-1 truncate max-w-20 hover:text-abbey-400 transition-colors duration-150 text-cyan-500"><i className="bi bi-person-circle"></i>  {activeUser.user.name}</span> : <Link to="/login" className=" mx-1 truncate hover:text-abbey-400 transition-colors duration-150 text-cyan-500">LOG IN</Link>}
                </li>

            </ul>
            <div className="absolute w-full max-h-96 overflow-hidden h-min flex flex-col top-[100%]">
                    <Notifications></Notifications>
            </div>
        </nav>
    </MediaQuery>
    <MediaQuery maxWidth={640}>
        <nav className="w-screen  h-12 bg-bunker-950 shadow-sm shadow-bunker-900 relative">
            <ul className="relative flex w-full h-full items-center justify-center">
                <li className="w-1/6 flex justify-center text-3xl text-ship-cove-50" onClick={()=> setMenuMobile(!isMenuMobile)}>
                <i className="bi bi-list"></i>
                </li>
                <li className="w-5/6 flex justify-center">
                    <input onKeyDown={onDown} onChange={(ev)=> setQuery(ev.target.value)} type="text" className="w-3/4 peer outline-none p-1 font-Dmsans font-semibold text-sm rounded-sm bg-bunker-700 text-abbey-50" name="Search" placeholder="write the name of a movie"/>
                    <button onClick={()=> search()} className="w-1/4 peer-focus:rotate-180 transition-all text-xl text-ship-cove-50">
                        <i className="bi bi-search"></i>
                    </button>
                </li>
                <motion.li 
                    initial={"closed"}
                    animate={`${isMenuMobile ? "open":"closed"}`}
                    variants={movileMenu}
                    className="w-5/6 h-full absolute right-0 bg-bunker-950 flex items-center justify-center font-Dmsans font-medium text-sm text-ship-cove-100">
                    <Link to="/" className="mx-1">HOME</Link>
                    <Link to="/rated" className="mx-1">DISCOVER</Link>
                    {activeUser.user? <span className=" mx-1 truncate max-w-20 hover:text-abbey-400 transition-colors duration-150 text-cyan-500"><i className="bi bi-person-circle"></i>  {activeUser.user.name}</span> : <Link to="/login" className="mx-4 text-cyan-500 font-bold">LOG IN</Link>}
                </motion.li>
            </ul>
            <div className="absolute w-full max-h-96 overflow-hidden h-min flex flex-col top-[100%]">
                    <Notifications></Notifications>
            </div>
        </nav>
    </MediaQuery>
    </>
}