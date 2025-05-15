import mysql.connector
from config.production import config

class FavoriteModel:
    def __init__(self):
        """Initialize the database connection."""
        self.connection = mysql.connector.connect(
            host=config.MYSQL_HOST,
            user=config.MYSQL_USERNAME,
            password=config.MYSQL_PASSWORD,
            database=config.MYSQL_DB_NAME
        )
        self.cursor = self.connection.cursor(dictionary=True)  # Fetch results as dictionaries

    def add_favorite(self, user_id, movie_id):
        print("reach add_favorite in favorite.py")
        query = "INSERT INTO favorites (user_id, movie_id) VALUES (%s, %s)"
        self.cursor.execute(query, (user_id, movie_id))
        self.connection.commit()

    def remove_favorite(self, user_id, movie_id):
        query = "DELETE FROM favorites WHERE user_id = %s AND movie_id = %s"
        self.cursor.execute(query, (user_id, movie_id))
        self.connection.commit()

    def get_favorites(self, user_id):
        query = "SELECT movie_id FROM favorites WHERE user_id = %s"
        self.cursor.execute(query, (user_id,))
        results = self.cursor.fetchall()
        print(f"get_favorites results: {results}")
        return [row['movie_id'] for row in results]