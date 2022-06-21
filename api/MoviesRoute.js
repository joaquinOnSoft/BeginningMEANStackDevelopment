import MoviesController from './MoviesController.js';

export default class MoviesRoute {
	static configRoutes(router){
		//router.route('/').get((req, res) => res.send('Hello World!'));
		router.route('/').get(MoviesController.apiGetMovies);
		return router;
	}
}