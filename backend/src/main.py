import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.search_product import search_products
from utils.recommend_products import recommend_products
from utils.fetch_product_info import fetch_product


app=FastAPI()

origins=[
    "http://localhost:8000",
    "http://localhost:5173"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/products/{query}")
async def get_products(query:str):
    return search_products(query=query,max_results=20)

@app.get("/recommend/{product_id}")
async def recommended_products(product_id:str):
    return recommend_products(product_id=product_id,num_recommend=10)

@app.get("/fetch_product_info/{product_id}")
async def fetch_product_info(product_id:int):
    return fetch_product(product_id)