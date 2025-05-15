from flask import request, jsonify
from model.movies import MoviesModel
from flask import request,jsonify
from config.production import config

class MoviesController:
    def get_filtered_movies(self):

        genre = request.args.get("genre")
        year = request.args.get("year")
        country = request.args.get("country")

        if year:
            year = int(year)

        print(genre)
        print(year)
        print(country)
        try:

            pageId = request.args.get('p')
            skip = 0
            if pageId:
                skip = int(pageId) * 50

            moviesModel = MoviesModel(config.MONGO_URI, config.MONGO_DB_NAME, config.MONGO_COLLECTION_NAME)
            filtered_movies = moviesModel.get_filtered_movies(genre=genre, year=year, country=country,skip=skip)
            return jsonify(filtered_movies)
        except Exception as e:
            return f"Error connecting to MongoDB: {e}"

    def getMoviesByIds(self, ids):
        try:
            moviesModel = MoviesModel(config.MONGO_URI, config.MONGO_DB_NAME, config.MONGO_COLLECTION_NAME)
            documents = moviesModel.get_movies_by_ids(ids)
            return jsonify(documents)  # Return results as JSON
        except Exception as e:
            return f"Error connecting to MongoDB: {e}"