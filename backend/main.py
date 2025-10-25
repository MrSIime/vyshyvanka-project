from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db.database import connect_databases, disconnect_databases
from routers import artifacts, analysis # Розділяємо логіку
import uvicorn

app = FastAPI(title="Vyshyvka API")

# НАЛАШТУВАННЯ CORS ДЛЯ ЗВ'ЯЗКУ З ФРОНТЕНДОМ
# В майбутньому сюди треба буде додати URL вашого сайту на Vercel
origins = [
    "http://localhost:5173", # Дозвіл для локальної розробки
    # "https://your-frontend-name.vercel.app", # Додасте це після деплою фронтенду
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Підключаємо роутери
app.include_router(artifacts.router)
# app.include_router(analysis.router) # Коли буде готовий роутер для аналізу

@app.on_event("startup")
async def startup():
    await connect_databases()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_databases()

@app.get("/")
async def root():
    return {"message": "Vyshyvka API is running"}

# ПЕРЕНЕСІТЬ ЛОГІКУ АНАЛІЗУ В `routers/analysis.py`
# А поки що залишимо тут для простоти
@app.post("/api/analysis")
async def post_analysis(file: UploadFile = File(...)):
    # ... ваш код аналізу ...
    return {"message": "Analysis endpoint is working"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)