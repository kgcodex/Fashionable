import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from utils.search_product import search_products
from utils.recommend_products import recommend_products
from utils.fetch_product_info import fetch_product


app=FastAPI()

def get_cors_origins():
    origins = [
        "http://localhost:5173",  
        "http://localhost:8000",   
    ]
    
    # Add Vercel URLs automatically
    if os.getenv("VERCEL_URL"):
        origins.append(f"https://{os.getenv('VERCEL_URL')}")
    
    if os.getenv("VERCEL_PROJECT_PRODUCTION_URL"):
        origins.append(f"https://{os.getenv('VERCEL_PROJECT_PRODUCTION_URL')}")
    
    return origins


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

api_router = APIRouter(prefix="/api")

@api_router.get("/products/{query}")
async def get_products(query:str):
    return search_products(query=query,max_results=20)

@api_router.get("/recommend/{product_id}")
async def recommended_products(product_id:str):
    return recommend_products(product_id=product_id,num_recommend=10)

@api_router.get("/fetch_product_info/{product_id}")
async def fetch_product_info(product_id:int):
    return fetch_product(product_id)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)