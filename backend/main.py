from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db.database import connect_databases, disconnect_databases
from routers import artifacts
import uvicorn
from pydantic import BaseModel
from typing import List, Optional

# Імпортуємо оновлені функції
from core.analysis_logic import generate_text_from_multimodal
from core.analysis_image import generate_ornament_base64

app = FastAPI(title="Vyshyvka API")

# Налаштування CORS
origins = ["http://localhost:5173", "https://vyshyvka-atlas.vercel.app"] # Додайте URL з Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await connect_databases()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_databases()

app.include_router(artifacts.router)

# --- НОВИЙ ЕНДПОІНТ АНАЛІЗУ ---

class AnalysisResponse(BaseModel):
    name: str
    symbols: List[str]
    origin: str
    techniques: List[str]
    colors: List[str]
    ornamentImage: str

@app.post("/api/analysis", response_model=AnalysisResponse)
async def analysis(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        # 1. Отримуємо текстовий аналіз
        text_analysis_raw = generate_text_from_multimodal(image_bytes)
        
        # 2. Парсимо текстову відповідь у структуровані дані
        lines = text_analysis_raw.strip().split('\n')
        analysis_data = {
            "name": lines[0].strip(),
            "symbols": [s.strip() for s in lines[1].split('&')],
            "origin": lines[2].strip(),
            "techniques": [t.strip() for t in lines[3].split('&')],
            "colors": [c.strip() for c in lines[4].split('&')],
        }

        # 3. Генеруємо зображення орнаменту
        ornament_base64 = generate_ornament_base64(image_bytes)

        # 4. Повертаємо єдину JSON відповідь
        return {**analysis_data, "ornamentImage": ornament_base64}

    except Exception as e:
        print(f"Помилка аналізу: {e}")
        raise HTTPException(status_code=500, detail=f"Не вдалося обробити зображення: {e}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)