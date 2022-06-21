import express from 'express';
import cors from 'cors';
import MoviesRoute from './api/MoviesRoute.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import MoviesDAO from './dao/MoviesDAO.js';

class Index {
	static app = express();

	static router = express.Router();

	static main(){
		dotenv.config();
		Index.setUpServer();
		Index.setUpDatabase();
	}

	static async setUpDatabase(){
		const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_UI);
		try{
			//Connect to MongoDB Cluster
			await client.connect();
			await MoviesDAO.injectDB(client);
		} catch (e){
			console.error(e);
			process.exit(-1);
		}
	}

	static async setUpServer(){
		Index.app.use(cors());
		Index.app.use(express.json());
		Index.app.use('/api/v1/movies', MoviesRoute.configRoutes(Index.router));
		Index.app.use('*', (req, res) => {
			res.status(404).json({error: 'not found'});
		})

		const port = process.env.PORT || 8000;

		try{
			Index.app.listen(port, () => {
				console.log(`Server us running on port ${port}`);
			});
		} catch (e){
			console.error(e);
			process.exit(-1);
		}
	}
}

Index.main();