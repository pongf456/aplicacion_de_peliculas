export interface notifications {
    title:string
    data:string
}

export interface currentUser {
    name:string
    JWT:string
}
export enum sectionType {
    movie="movie",
    tv="tv"
}
export interface movie {
    id:number
    adult:boolean
    backdrop_path:string
    genre_ids:number[]
    original_language:string
    original_title:string
    overview:string
    popularity:number
    poster_path:string
    release_date:string
    title:string
    video:boolean
    vote_average:number
    vote_count:number
}
export interface movieDetails {
    adult:boolean
    backdrop_path:string
    belongs_to_collection:any
    budget:number
    genres: {id:number,name:string}[]
    homepage:string
    id:number
    imdb_id:string
    original_language:string
    original_title:string
    overview:string
    popularity:number
    poster_path:string
    production_companies:{id:number,name:string,origin_country:string,logo_path:string}[]
    production_countries:{iso_3166_1:string,name:string}[]
    release_date:string
    revenue:number
    runtime:number
    spoken_languages:{english_name:string,iso_639_1:string,name:string}
    status:string
    tagline:string
    title:string
    video:boolean
    vote_average:number
    vote_count:number
}
export interface tv {
    backdrop_path:string
    first_air_date:string
    genre_ids:number[]
    id:number
    name:string
    origin_country:string[]
    original_language:string
    original_name:string
    overview:string
    popularity:number
    poster_path:string
    vote_average:number
    vote_count:number
}
export interface tvDetails {
    adult:boolean
    backdrop_path:string
    created_by:{
        credit_id:string
        gender:number
        id:number
        name:string
        profile_path:string
    }[]
    first_air_date:string
    genres:{
        id:number
        name:string
    }[]
    homepage:string
    id:number
    in_production:boolean
    last_air_date:string
    name:string
    original_name:string
    number_of_episodes:number
    number_of_seasons:number
    overview:string
    popularity:string
    poster_path:string
    original_language:string
    status:string
    vote_average:number
    vote_count:number
    production_companies: {
        id:number
        logo_path:string
        name:string
        origin_country:string
    }[]
}
export interface baseSearch extends movie,tv {
    media_type:sectionType
}