import os

from dbutils.db import db_connect

def recommend_products(product_id:str, num_recommend:int=10):
    """
    Recommend Product Based on product_id
    Args:
        product_id (str): Product id of product.
        num_recommend (int): The maximum number of results to return.

    Returns:
        JSON: Product Description
    """
    connection=None
    client = None
    try:
        # Connect to MongoDB
        connection=db_connect()
        client = connection["client"]
        db = connection["database_name"]
        collection = connection["collections"]["Products_Embeddings"]
        search_index_name=connection["search_idx"]["Product_Recommend_idx"]

        # Extracting Source Embedding
        source_document = collection.find_one({"id": product_id})
        query_vector = source_document["embedding"]

        # Define the Aggregation Pipeline 
        pipeline = [
            {
                "$vectorSearch": {
                    "index": search_index_name,
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 150,
                    "limit": num_recommend + 1
                }
            },
            {
                "$project": { 
                     "_id": 0,
                     "id":1,
                      }
            }
        ]

        # Execute the query
        recommended = list(collection.aggregate(pipeline))    
        recommend=[int(doc['id']) for doc in recommended if doc['id'] != product_id]
        results= {"product_ids": recommend}
        return results

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"product_ids":[]}
    finally:
        if client:
            client.close()
