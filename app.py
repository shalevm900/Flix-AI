from flask import Flask, render_template, request,flash, jsonify
from controller.movies import MoviesController
from controller.site import SiteController
from controller.users import UsersController
from controller.ai import AiController
app = Flask(__name__)
app.secret_key = "flixaiProject_111"


@app.route("/")
def showSite():
    return SiteController.render(favorites=False)

@app.route("/favorites")
def showFavorites():
    return SiteController.render(favorites=True)

@app.route("/api/v1/users/login", methods=["POST"])
def login():
    usersController = UsersController()
    return usersController.login()

@app.route("/api/v1/top-movies")
def showFavoritePage():
    userId = request.cookies.get('userIsLogged')
    moviesController = MoviesController()
    userController = UsersController()
    moviesIds = userController.get_favorite_movies(userId)
    return moviesController.getMoviesByIds(moviesIds)


@app.route("/api/v1/movies")
def getMovies():
    moviesController = MoviesController()
    return moviesController.get_filtered_movies()


@app.route("/api/v1/users/favorites/add", methods=["POST"])
def addFavoriteMovie():
    data = request.get_json()  # Get the JSON data from the request body
    user_id = data.get('userId')
    movie_id = data.get('movieId')
    usersController  = UsersController()
    return usersController.addToFavorites(user_id, movie_id)
    

@app.route("/api/v1/ai/texttofilter", methods=["POST"])
def textToFilter():
    data = request.get_json()
    user_text = data.get('user_text')
    aiController = AiController()
    return aiController.resolve(user_text=user_text)


@app.route("/api/v1/voice-search", methods=["POST"])
def voiceSearch():
    audio_file = request.files['audio']
    if not audio_file:
        return jsonify({
            "status": 1,
            "error": "No audio file provided"
        }), 400

    aiController = AiController()
    return aiController.voiceSearch(audio_file=audio_file)



if __name__ == "__main__":
    app.run(debug=True)