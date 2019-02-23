import APIDataModel from "./APIModel.js";

class Movie extends APIDataModel{
    constructor(id,title,poster,overview,link){
        super();
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.link =link;        
    }
    

    getDetailApiUrl(movie_id,key){
        return this.genereteApiPath(this.detail_path,movie_id,key);
    }

    getVideoApiUrl(movie_id,key){
        return this.genereteApiPath(this.videos_path,movie_id,key);
    }

    genereteApiPath(raw_url,movie_id,key){
        return this.rootURL + raw_url.replace("{movie_id}",movie_id).replace("<<api_key>>",key);
    }

    async fetchMovieDetail(movie_id,key){
        const fetchResult = await fetch(this.getDetailApiUrl(movie_id,key));
        const jsonResult = await fetchResult.json();
        const fetchVideoResult = await fetch(this.getVideoApiUrl(movie_id,key));
        const videoResult = await fetchVideoResult.json();
        const videoArray = videoResult.results;
        return this.updateData(jsonResult,videoArray);
    }

    updateData(data,video){
        console.log(data);
        this.id = data.id;
        this.title = data["original_title"];
        this.poster = data["poster_path"];
        this.overview = data["overview"];
        this.video = video;
        return this;
    }

}

export default Movie;