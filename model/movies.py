from bson import ObjectId
from pymongo import MongoClient
from pymongo import MongoClient, errors

class MoviesModel:
    def __init__(self, uri, db_name, collection_name):
        try:
            self.client = MongoClient(uri)
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
        except errors.ConnectionError as e:
            raise Exception(f"Error connecting to MongoDB: {e}")

    def get_filtered_movies(self, genre=None, year=None, country=None, skip=0, limit=50):
        query = {}

        if genre:
            query["genres"] = {"$in": [genre]}

        if year:
            query["year"] = year

        if country:
            query["countries"] = {"$in": [country]}

        try:
            filtered_movies = list(
                self.collection.find(query)
                .sort("year", -1)
                .skip(skip)
                .limit(limit)
            )

            # Convert ObjectId to string
            for movie in filtered_movies:
                if '_id' in movie:
                    movie['_id'] = str(movie['_id'])

            return filtered_movies
        except Exception as e:
            raise Exception(f"Error fetching filtered movies: {e}")


    def get_all_documents(self,skip):
        return list(
            self.collection.find({}
                                 , {"_id": 0}).sort("year",-1).skip(skip).limit(50)
        )  # Exclude MongoDB ObjectId
    def get_all_documents(self):
        movies = list(
            self.collection.find({}).sort("year", -1).skip(0).limit(50)
        )
        # Convert ObjectId to string for JSON serialization
        for movie in movies:
            movie['_id'] = str(movie.get('_id'))
        return movies

    def get_movies_by_ids(self, ids):
        id_list = [item["_id"] for item in ids]
        print("Extracted id_list:", id_list)

        movies = list(self.collection.find({"_id": {"$in": id_list}}))

        # Convert ObjectId to string for JSON serialization
        for movie in movies:
            movie['_id'] = str(movie.get('_id'))
        return movies