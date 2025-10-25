from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Any
from db.database import database_znakhidky, database_styles

# Модель для списку артефактів на карті
class ArtifactMapInfo(BaseModel):
    id: int
    title: str
    # На фронтенді ми очікуємо масив [lat, lon]
    coordinates: List[float]

# Модель для повної інформації про артефакт
class ArtifactDetails(BaseModel):
    id: int
    title: str
    location: Optional[str] = None
    coordinates: List[float]
    style_id: Optional[int] = None
    styleName: Optional[str] = None # Додаємо назву стилю
    description: Optional[str] = None
    source_url: Optional[str] = None
    photo_url: Optional[str] = None
    ornament_photo_url: Optional[str] = None

router = APIRouter(prefix="/api/artifacts", tags=["Artifacts"])

# ВИПРАВЛЕНО: GET /api/artifacts - повертає id, title та координати
@router.get("", response_model=List[ArtifactMapInfo])
async def get_all_artifacts_for_map():
    query = "SELECT id, title, location_y, location_x FROM znakhidky WHERE location_y IS NOT NULL AND location_x IS NOT NULL"
    results = await database_znakhidky.fetch_all(query=query)
    
    # Трансформуємо дані у потрібний для фронтенду формат
    formatted_results = [
        {
            "id": r["id"],
            "title": r["title"],
            "coordinates": [r["location_y"], r["location_x"]]
        }
        for r in results
    ]
    return formatted_results

# ВИПРАВЛЕНО: GET /api/artifacts/{id} - повертає повну інформацію
@router.get("/{artifact_id}", response_model=ArtifactDetails)
async def get_artifact_by_id(artifact_id: int):
    # 1. Отримуємо основну інформацію про артефакт
    query_artifact = "SELECT * FROM znakhidky WHERE id = :id"
    artifact = await database_znakhidky.fetch_one(query=query_artifact, values={"id": artifact_id})
    
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")

    # Перетворюємо результат у словник, щоб його можна було змінювати
    artifact_dict = dict(artifact)
    
    # 2. Отримуємо назву стилю з іншої бази даних
    style_name = None
    if artifact_dict.get("style_id"):
        query_style = "SELECT name FROM styles WHERE id = :id"
        style_result = await database_styles.fetch_one(query=query_style, values={"id": artifact_dict["style_id"]})
        if style_result:
            style_name = style_result["name"]

    # 3. Формуємо фінальний об'єкт для відповіді
    return {
        "id": artifact_dict["id"],
        "title": artifact_dict["title"],
        "location": artifact_dict["location"],
        "coordinates": [artifact_dict["location_y"], artifact_dict["location_x"]],
        "style_id": artifact_dict["style_id"],
        "styleName": style_name, # Додаємо назву стилю
        "description": artifact_dict["description"],
        "source_url": artifact_dict["source_url"],
        "photo_url": artifact_dict["photo_url"],
        "ornament_photo_url": artifact_dict["ornament_photo_url"],
    }