from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from dotenv import load_dotenv
from typing import Any
import os

load_dotenv()

def db_connect() -> dict[str,Any]:

    """
    Database Connection Utility

    Returns:
        Dict[str, Any]: A dictionary containing the client, database, collections, and search indexes.
    """

    # Database Details
    MONGO_URI: str|None = os.getenv('MONGO_URI')

    if not MONGO_URI:
        print("MongoDB URI not set. Please check your .env file.")
        raise ValueError("MongoDB URI not found in environment variables.")

    # Database Name
    DATABASE_NAME: str = "Fashionable"

    # Collections
    PRODUCTS_COLLECTION_NAME: str = "Products"
    EMBEDDINGS_COLLECTION_NAME: str = "Products_Embeddings"

    # Search Indexes
    VECTOR_INDEX_NAME: str = "product_recommend_index"
    SEARCH_INDEX_NAME: str = "product_search_index" 

    # Connecting to Database
    client: MongoClient=MongoClient(MONGO_URI)
    db: Database = client[DATABASE_NAME]

    collections: dict[str,Collection] = {
        "Products":db[PRODUCTS_COLLECTION_NAME],
        "Products_Embeddings":db[EMBEDDINGS_COLLECTION_NAME]
    }

    search_indexes: dict[str,str]={
        "Product_Search_idx":SEARCH_INDEX_NAME,
        "Product_Recommend_idx":VECTOR_INDEX_NAME
    }

    return {
        "client":client,
        "database_name":db,
        "collections":collections,
        "search_idx":search_indexes,
        }
