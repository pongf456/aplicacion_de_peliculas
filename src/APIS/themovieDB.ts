import axios from "axios";

const connection = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Authorization:"Bearer " + import.meta.env.VITE_TMDB_TOKEN_KEY
    }
})

export async function getMovies(page = 1,with_genres?:number) {
    try{
        const data =  await connection.get("/discover/movie",{
            params:{
                page,
                with_genres: with_genres || undefined
            }
        })
        console.log("obtain movies")
        return data.data
    }
    catch (error) {
        return error
    }
}
export async function getTv(page = 1,with_genres?:number) {
    try {
        const data =  await connection.get("/discover/tv",{
            params:{
                page,
                with_genres:with_genres || undefined
            }
        })
        console.log("obtain series")
        return data.data
    }
    catch (error) {
        return error
    }
}
export async function getMovieById(movie_id:number) {
    try {
        const data = await connection.get("/movie/"+movie_id)
        console.log("obtain movie id")
        return data.data
    }
    catch (error){
        return error
    }
}
export async function getTvByID(Tv_id:number) {
    try{
        const data = await connection.get(`/tv/${Tv_id}`)
        return data.data
    }
    catch ( error) {
        return error
    }
}
export async function searchAll (query:string, page = 1) {
    try{
        const data = await connection.get("/search/multi",{
            params:{
                query,
                page
            }
        })
        console.log("search query")
        return data.data
    }
    catch (error){
        return error
    }
}
export async function getMovieTopRated(page = 1) {
    try{
        const data = await connection.get("/movie/top_rated",{
            params:{
                page
            }
        })
        console.log("fetching movies top rated")
        return(data.data)
    }
    catch (error) {
        return error
    }
}
export async function getMoviePopular(page = 1) {
    try{
        const data = await connection.get("/movie/popular",{
            params:{
                page
            }
        })
        console.log("fetching movies popular")
        return(data.data)
    }
    catch (error) {
        return error
    }
}
export async function getTvTopRated(page = 1) {
    try{
        const data = await connection.get("/tv/top_rated",{
            params:{
                page
            }
        })
        console.log("fetching tv top rated")
        return(data.data)
    }
    catch (error) {
        return error
    }
}
export async function getTvPopular(page = 1) {
    try{
        const data = await connection.get("/tv/popular",{
            params:{
                page
            }
        })
        console.log("fetching tv popular")
        return(data.data)
    }
    catch (error) {
        return error
    }
}
export async function getMovieGenres(){
    try{
        const data = await connection.get("/genre/movie/list")
        console.log("fetching genres")
        return(data.data)
    }
    catch (error) {
        return error
    }
}
export async function getTvGenres(){
    try{
        const data = await connection.get("/genre/tv/list")
        console.log("fetching genres")
        return(data.data)
    }
    catch (error) {
        return error
    }
}