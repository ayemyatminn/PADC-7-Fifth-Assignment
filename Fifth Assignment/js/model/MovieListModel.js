import APIDataModel from "./APIModel.js";


class MovieListModel extends APIDataModel {
   
    getUpcomingApiUrl(key){
        return this.rootURL + this.upcoming_path.replace("<<api_key>>",key);
    }

    async fetchUpcomingMovie(key){
        const fetchResult = await fetch(this.getUpcomingApiUrl(key));
        const jsonResult = await fetchResult.json();
        return jsonResult.results;
    }

   
    
}

export default MovieListModel;