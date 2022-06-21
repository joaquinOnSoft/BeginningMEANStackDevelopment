export default class MoviesDAO {
	static movies;

	static async injectDB(conn){
		if(MoviesDAO.movies){
			return;
		}

		try{
			MoviesDAO.movies = await conn.db(process.env.MOVIEREVIEWS_NS)
				.collection('movies');

			console.debug('Recovering movies collections');
		}
		catch (e){
			console.error(`Unable to cnnect in Movies DAO ${e}`);
		}
	}

	static async getMovies({
			//default filte
			filters = null,
			page = 0,
			moviesPerPage = 20 //Will only get 20 movies at once
		} = {}){

		let query;
		if (filters){
			if('title' in filters){
				query = { $text: {$search: filters.title} };
			}
			else if ('rated' in filters){
				query = { rated: { $eq: filters.rated} };
			}
		}

		let cursor;
		try{
			cursor = await MoviesDAO.movies
				.find(query)
				.limit(moviesPerPage)
				.skip(moviesPerPage * page);

			const movieList = await cursor.toArray();
			const totalNumMovies = await MoviesDAO.movies.countDocuments(query);
			return {movieList, totalNumMovies};
		}
		catch (e){
			console.error(`Unable to issue find command, $(e)`);
			return {movieList: [], totalNumMovies: 0};
		}
	}
}