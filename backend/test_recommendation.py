import os
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

# --- Configuration---
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DATABASE_NAME = "Fashionable"

PRODUCTS_COLLECTION_NAME = "Products"
EMBEDDINGS_COLLECTION_NAME = "Products_Embeddings"

VECTOR_INDEX_NAME = "product_recommend_index"
IMAGE_DOWNLOAD_DIR = "product_images"


def get_recommendations_and_download_images(product_id: str, num_recommendations: int = 10):

    if not MONGO_URI:
        print("MongoDB URI not set. Please check your .env file.")
        return

    os.makedirs(IMAGE_DOWNLOAD_DIR, exist_ok=True)
    
    client = None
    try:
        print("Connecting to MongoDB Atlas...")
        client = MongoClient(MONGO_URI)
        db = client[DATABASE_NAME]

        products_collection = db[PRODUCTS_COLLECTION_NAME]
        embeddings_collection = db[EMBEDDINGS_COLLECTION_NAME]
        print("Connection successful.")

        #  Vector Search 
        print(f"Finding embedding for product ID: {product_id}...")
        source_document = embeddings_collection.find_one({"id": product_id})
        if not source_document:
            print(f"Error: Product with ID '{product_id}' not found in the embeddings collection.")
            return
        query_vector = source_document["embedding"]

        print("Performing vector search to find similar products...")
        pipeline = [
            {
                "$vectorSearch": {
                    "index": VECTOR_INDEX_NAME,
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": 150,
                    "limit": num_recommendations + 1
                }
            },
            {
                "$project": { "id": 1, "_id": 0 }
            }
        ]
        results = list(embeddings_collection.aggregate(pipeline))

        recommended_ids = [int(doc['id']) for doc in results if doc['id'] != product_id]
        all_ids_to_download = [int(product_id)] + recommended_ids[:num_recommendations]
        print(f"Found {len(recommended_ids)} recommendations.")
        
        # Fetch product details
        print("Fetching product details and image links...")
        
        product_details = list(products_collection.find(
            {"id": {"$in": all_ids_to_download}},
            {"id": 1, "images.front_image_url": 1, "_id": 0} 
        ))

        if not product_details:
            print("Error: Could not find product details for the given IDs.")
            return

        # Download the images
        print("\nDownloading images...")
        for product in product_details:
            prod_id = product.get("id")
            
            images_dict = product.get("images", {})
            image_url = images_dict.get("front_image_url") 
            if not image_url:
                print(f"  - Skipping product {prod_id}: No image link found.")
                continue

            try:
                response = requests.get(image_url, timeout=10)
                if response.status_code == 200:
                    file_path = os.path.join(IMAGE_DOWNLOAD_DIR, f"{prod_id}.jpg")
                    with open(file_path, 'wb') as f:
                        f.write(response.content)
                    print(f"  ✓ Downloaded image for product {prod_id}")
                else:
                    print(f"  - Failed to download for product {prod_id}: Status code {response.status_code}")
            except requests.exceptions.RequestException as e:
                print(f"  - Error downloading for product {prod_id}: {e}")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if client:
            client.close()
            print("\nMongoDB connection closed.")

if __name__ == "__main__":
    PRODUCT_ID_TO_TEST = "54694" 
    get_recommendations_and_download_images(PRODUCT_ID_TO_TEST)