import os
import json
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure, BulkWriteError
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
MONGO_URI = os.getenv('MONGO_URI')
DATABASE_NAME = "Fashionable"     
COLLECTION_NAME = "Products_Embeddings" 

JSON_FOLDER_PATH =  os.path.expanduser("../embeddings")  
BATCH_SIZE = 1000

def ingest_embeddings_data():
    
    if not MONGO_URI:
        print("MongoDB URI not set. Please set the MONGO_URI environment variable.")
        return

    client = None
    try:
        # Connect to MongoDB Atlas 
        print("Connecting to MongoDB Atlas...")
        client = MongoClient(MONGO_URI)
        client.admin.command('hello')
        print("Connection successful.")

        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]
        print(f"Targeting collection: '{collection.name}' in database: '{db.name}'")

        documents_batch = []
        file_count = 0
        print(f"Processing files from: {os.path.abspath(JSON_FOLDER_PATH)}")

        for filename in os.listdir(JSON_FOLDER_PATH):
            if not filename.endswith('.json'):
                continue 

            file_path = os.path.join(JSON_FOLDER_PATH, filename)
            file_count += 1
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    documents_batch.append(data)

                if len(documents_batch) >= BATCH_SIZE:
                    print(f"  -> Inserting batch of {len(documents_batch)} documents...")
                    collection.insert_many(documents_batch)
                    documents_batch.clear() 

            except json.JSONDecodeError:
                print(f"     Error: Could not decode JSON from {filename}. Skipping.")
            except Exception as e:
                print(f"     An error occurred with {filename}: {e}")


        if documents_batch:
            print(f"  -> Inserting final batch of {len(documents_batch)} documents...")
            collection.insert_many(documents_batch)
        
        print(f"\nIngestion complete. Processed {file_count} files.")

    except ConnectionFailure as e:
        print(f"Error: Could not connect to MongoDB. Details: {e}")
    except BulkWriteError as bwe:
        print(f"Error during a bulk write operation. Details: {bwe.details}")
    except OperationFailure as e:
        print(f"Error: An operation failed. Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if client:
            client.close()
            print("MongoDB connection closed.")

if __name__ == "__main__":
    ingest_embeddings_data()