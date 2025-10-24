import aiofiles
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from db.database import connect_databases, disconnect_databases
from routers import artifacts
import uvicorn
from db.load_items import get_findings_from_db
from core.analysis_logic import generate_text_from_multimodal
from core.analysis_image import generate

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

@app.get("/api/get-items")
async def get_items():
    return {"text": get_findings_from_db()}

@app.post("/api/analysis")
async def analysis(file: UploadFile = File(...)):
    try:
    
        image_bytes = await file.read()

        return {
            "text": generate_text_from_multimodal(image_bytes),
            "url": generate(image_bytes)
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не вдалося завантажити файл: {e}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)