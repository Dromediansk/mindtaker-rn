from fastapi import FastAPI
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello from Mindtaker!"}