from flask import request, jsonify, make_response
from model.users import UsersModel, UserNotFoundException
import hashlib
from datetime import datetime, timedelta
from model.favorite import FavoriteModel

class UsersController:
    def login(self):
        data = request.get_json()  # Use .json instead of get_json()
        if not data:
            return jsonify(
                {
                    "status": 1,
                    "error":"No data received"
                }
            ), 400
        email = data.get("email")
        password = data.get("password")
        hashed_password = hashlib.md5(password.encode()).hexdigest()

        UsersModelObj = UsersModel()
        try:
            user = UsersModelObj.getUserByEmail(email)
            response = make_response(jsonify(
                {
                    "status": 0,
                    "error": ""
                }), 200)
            print(user['id'])

            expires = datetime.utcnow() + timedelta(hours=6)  # Set expiration time to 6 hours
            response.set_cookie('userIsLogged', str(user['id']), expires=expires, httponly=False)
            return response

        except UserNotFoundException as e:
            return jsonify(
                {
                    "status": 2,
                    "error": "User does not exist"
                }), 400

    def addToFavorites(self, userId, movieId):
        print("reach addToFavorites in users.py")
        userId = request.cookies.get('userIsLogged')
        print(userId)
        favorites = FavoriteModel()
        try:
            favorites.add_favorite(userId, movieId)
            return jsonify(
                {
                    "status": 0,
                    "error": ""
                }), 200
        except Exception as e:
            return jsonify(
                {
                    "status": 1,
                    "error": str(e)
                }), 400

    def get_favorite_movies(self, user_id):
        favorites = FavoriteModel()
        try:
            favorite_movies = favorites.get_favorites(user_id)
            return favorite_movies
        except Exception as e:
            return jsonify(
                {
                    "status": 1,
                    "error": str(e)
                }), 400

