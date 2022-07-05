import MoviesController from './MoviesController.js';
import ReviewsController from './ReviewsController.js';


export default class MoviesRoute {
	/**
	 * Some URL exampmples:
	 * <strong>GET /api/v1/movies</strong> Recover all movies that match
	 * the given filter
	 * <ul>
	 *     <li>http://localhost:5000/api/v1/movies</li>
	 *     <li>http://localhost:5000/api/v1/movies?title=Dragon</li>
	 *     <li>http://localhost:5000/api/v1/movies?rated=G</li>
	 *     <li>http://localhost:5000/api/v1/movies?rated=G&page=2</li>
	 * </ul>
	 * 
	 */
	static configRoutes(router){
		router.route('/').get(MoviesController.apiGetMovies);

		router.route('/review')
			.post(ReviewsController.apiPostReview)
			.put(ReviewsController.apiUpdateReview)
			.delete(ReviewsController.apiDeleteReview);

		return router;
	}
}