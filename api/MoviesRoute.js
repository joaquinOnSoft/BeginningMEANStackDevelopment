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
	 * 
	 * <ul>
	 * 		<li>
	 * 			[POST] http://localhost:5000/api/v1/movies/review
	 * 			<code>
	 * 			{
	 *     			"movie_id": "573a1390f29313caabcd4135",
	 *     			"review": "Great movie",
	 *     			"user_id": "1234",
	 *     			"name": "John"
	 * 			}
	 * 			</code>
	 * 		</li>
	 * 		<li>
	 * 			[PUT] http://localhost:5000/api/v1/movies/review
	 * 			<code>
	 * 			{
	 * 			    "review_id": "62cd8b11880afc8a05b11e52",
	 * 			    "review": "Bad movie",
	 * 			    "user_id": "1234",
	 * 			    "name": "John"
	 * 			}
	 * 			</code>
	 * 		</li>
	 * 		<li>
	 * 			[DELETE] http://localhost:5000/api/v1/movies/review
	 * 			<code>
	 *    		{
	 *        		"review_id": "62cd947219d5657e4b67274e",
	 *        		"user_id": "1234"
	 *    		}
	 * 			</code>
	 * 		</li>
	 * 		<li>[GET] http://localhost:5000/api/v1/movies/id/573a1390f29313caabcd4135</li>
	 * 		<li>[GET] http://localhost:5000/api/v1/movies/ratings</li>
	 * </ul>
	 */
	static configRoutes(router){
		router.route('/').get(MoviesController.apiGetMovies);

		router.route('/id/:id').get(MoviesController.apiGetMovieById);

		router.route('/ratings').get(MoviesController.apiGetRatings);

		router.route('/review')
			.post(ReviewsController.apiPostReview)
			.put(ReviewsController.apiUpdateReview)
			.delete(ReviewsController.apiDeleteReview);

		return router;
	}
}