from contextlib import nullcontext

import mysql.connector
from config.production import config

class UsersModel:
    def __init__(self):
        """Initialize the database connection."""
        self.connection = mysql.connector.connect(
            host=config.MYSQL_HOST,
            user=config.MYSQL_USERNAME,
            password=config.MYSQL_PASSWORD,
            database=config.MYSQL_DB_NAME
        )
        self.cursor = self.connection.cursor(dictionary=True)  # Fetch results as dictionaries

    def getUserByEmail(self,email):
        query = "SELECT * FROM users WHERE email = %s"
        self.cursor.execute(query, (email,))
        user = self.cursor.fetchone()
        if user:
            return user
        else:
            raise UserNotFoundException()

class UserNotFoundException(Exception):
    def __init__(self, message="User not found"):
        self.message = message
        super().__init__(self.message)