import mongodb from 'mongodb';

export default class ReviewsDAO {
	static reviews;

	static ObjectId = mongodb.ObjectId;

	static async injectDB(conn){
		if(ReviewsDAO.reviews){
			return;
		}

		try{
			ReviewsDAO.reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
		}
		catch(e){
			console.log(`Unable to establish connection handle in ReviewsDAO`);
		}
	}

	static async addReview(movieId, user, review, date) {
		try{
			const reviewDoc = {
				name: user.name,
				user_id: user._id,
				date,
				review,
				movie_id: ReviewDAO.reviews.insertOne(reviewDoc)
			};

			return await ReviewDAO.review.insertOne(reviewDoc); 
		}
		catch(e){
			console.error(`Unable to post review ${e}`);
			return { error: e };
		}

	}

	static async updateReview(reviewId, userId, review, date) {
		try{
			const updateResponse = await ReviewsDAO.reviews.updateOne(
					{
						user_id: userId,
						_id: ReviewsDAO.ObjectId(reviewId)
					},
					{
						$set: {review, date}
					}
				);

			return updateResponse;
		}
		catch(e){
			console.error(`Unable to update review ${e}`);
			return { error: e };
		}		

	}

	static async deleteReview(reviewId, userId) {
		try{
			const deleteResponse = await ReviewsDAO.reviews.deleteOne(
					{
						_id: ReviewsDAO.ObjectId(reviewId),
						user_id: userId						
					}
				);

			return deleteResponse;
		}
		catch(e){
			console.error(`Unable to update review ${e}`);
			return { error: e };
		}		

	}	
}