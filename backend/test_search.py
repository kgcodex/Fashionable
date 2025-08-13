from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json

# Configuration 
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DATABASE_NAME = "Fashionable"
PRODUCTS_COLLECTION_NAME = "Products"

SEARCH_INDEX_NAME = "product_search_index" 

def test_text_search(query: str, max_results: int = 5):

    if not MONGO_URI:
        print("MongoDB URI not set. Please check your .env file.")
        return

    client = None
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DATABASE_NAME]
        collection = db[PRODUCTS_COLLECTION_NAME]

        # Define the Aggregation Pipeline 
        pipeline = [
            {
                "$search": {
                    "index": SEARCH_INDEX_NAME,
                    "text": {
                        "query": query,
                        "path": [
                            "brandName", 
                            "productDisplayName", 
                            "description", 
                            "masterCategoryType",
                            "gender",
                            "usage"
                        ],
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            },
            {
                "$limit": max_results
            },
            {
                "$project": {
                    "_id": 0,
                    "id": 1,
                    "productDisplayName": 1,
                    "brandName": 1,
                    "score": { "$meta": "searchScore" } 
                }
            }
        ]

        # Execute the query
        results = list(collection.aggregate(pipeline))
        return results

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return []
    finally:
        if client:
            client.close()

# Example Usage
if __name__ == "__main__":

    search_query = "ADIDAS red t-shrt for wemen" 
    
    print(f"Searching for: '{search_query}'...")
    search_results = test_text_search(search_query)

    if search_results:
        print(f"\nFound {len(search_results)} results:")
        for doc in search_results:
            print(json.dumps(doc, indent=2))
    else:
        print("No results found.")