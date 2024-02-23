import { Route, Routes } from "react-router-dom"
import { Nav } from "./components/Nav"
import { Suspense, lazy, useEffect } from "react"
import { Home } from "./routes/home"
const PeliDetail = lazy(()=> import("./routes/peliDetail"))
const TvDetail = lazy(()=> import("./routes/tvDetail"))
const SearchPage = lazy(()=> import("./routes/searchPage"))
const TopRated = lazy(()=> import("./routes/topRated"))
const Login = lazy(()=> import("./routes/login"))
function App() {
  useEffect(()=>{
    document.title = import.meta.env.VITE_PROJECT_NAME
  },[])
  return (
    <>
    <Nav></Nav>
    <div className="w-full h-[calc(100vh-3rem)]">
    <Routes>
      <Route  index element={<Home></Home>}></Route>
      <Route path="/movies/:id" element={<Suspense><PeliDetail></PeliDetail></Suspense>}/>
      <Route path="/tv/:id" element= {<Suspense><TvDetail></TvDetail></Suspense>}/>
      <Route path="/search/:search" element={<Suspense><SearchPage></SearchPage></Suspense>}></Route>
      <Route path="/rated" element={<Suspense><TopRated></TopRated></Suspense>}></Route>
      <Route path="/login" element={<Suspense><Login></Login></Suspense>}></Route>
    </Routes>
    </div>
    </>
  )
}

export default App
