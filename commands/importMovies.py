import requests
import json
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# MongoDB connection details
MONGO_URI = "mongodb+srv://maorb:Navush1234@cluster0.za2ujvy.mongodb.net/"
DB_NAME = "jobiq_class1"
COLLECTION_NAME = "movies"

# URL of the JSON file
JSON_URL = "https://bolowebsite.s3.us-west-2.amazonaws.com/exports/sample_mflix.movies.json"

# Download the JSON file
response = requests.get(JSON_URL)
if response.status_code == 200:
    movies = response.json()

    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # Insert data item by item
    for movie in movies:
        if "_id" in movie and "$oid" in movie["_id"]:
            movie["_id"] = ObjectId(movie["_id"]["$oid"])

        collection.insert_one(movie)
        print(f"Inserted: {movie['title']}")

    # Close connection
    client.close()
else:
    print("Failed to download JSON file.")