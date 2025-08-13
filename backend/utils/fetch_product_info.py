import os

from dbutils.db import db_connect

def fetch_product(product_id:int):
    """
    Fetch Product info using Product ID
    """
    connection=None
    client = None
    try:
        # Connect to MongoDB
        connection=db_connect()
        client = connection["client"]
        db = connection["database_name"]
        collection = connection["collections"]["Products"]

        result=collection.find_one({"id": product_id},{"_id": 0})
        return result

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {}
    finally:
        if client:
            client.close()
        
