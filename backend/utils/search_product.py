import os

from dbutils.db import db_connect

def search_products(query: str, max_results: int = 20):
    """
    Searches for products in the database using a text query.

    Args:
        query (str): The search term.
        max_results (int): The maximum number of results to return.

    Returns:
        Dict[str, List[Any]]: A dictionary containing a list of product IDs.
    """
    connection=None
    client = None
    try:
        # Connect to MongoDB
        connection=db_connect()
        client = connection["client"]
        db = connection["database_name"]
        collection = connection["collections"]["Products"]
        search_index_name=connection["search_idx"]["Product_Search_idx"]

        # Define the Aggregation Pipeline 
        pipeline = [
            {
                "$search": {
                    "index": search_index_name ,
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
                }
            }
        ]

        # Execute the query
        results = list(collection.aggregate(pipeline))      
        results= {"product_ids": [x["id"] for x in results]}
        return results

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"product_ids":[]}
    finally:
        if client:
            client.close()
