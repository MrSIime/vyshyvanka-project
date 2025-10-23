from fastapi import FastAPI
from db.database import connect_databases, disconnect_databases
from routers import artifacts
import uvicorn

app = FastAPI(title="Vyshyvka API")

@app.on_event("startup")
async def startup():
    await connect_databases()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_databases()

app.include_router(artifacts.router)

@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)