import uvicorn
import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from utils.search_product import search_products
from utils.recommend_products import recommend_products
from utils.fetch_product_info import fetch_product


app=FastAPI()
VERCEL_URL = os.environ.get("VERCEL_URL")

origins=[
    "http://localhost:8000",
    "http://localhost:5173"

]
if VERCEL_URL:
    origins.append(f"https://{VERCEL_URL}")

api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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