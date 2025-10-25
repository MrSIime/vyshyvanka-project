from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Any
from db.database import database_znakhidky, database_styles

# Модель для списку артефактів на карті
class ArtifactMapInfo(BaseModel):
    id: int
    title: str
    coordinates: List[float]
    # ДОДАНО: Поля, необхідні для тултіпу
    photo_url: Optional[str] = None
    location: Optional[str] = None

# Модель для повної інформації про артефакт
class ArtifactDetails(BaseModel):
    id: int
    title: str
    location: Optional[str] = None
    coordinates: List[float]
    style_id: Optional[int] = None
    styleName: Optional[str] = None
    description: Optional[str] = None
    source_url: Optional[str] = None
    photo_url: Optional[str] = None
    ornament_photo_url: Optional[str] = None

router = APIRouter(prefix="/api/artifacts", tags=["Artifacts"])

# ОНОВЛЕНО: GET /api/artifacts - тепер повертає більше полів
@router.get("", response_model=List[ArtifactMapInfo])
async def get_all_artifacts_for_map():
    # ДОДАНО: Отримуємо photo_url та location з бази даних
    query = "SELECT id, title, location_y, location_x, photo_url, location FROM znakhidky WHERE location_y IS NOT NULL AND location_x IS NOT NULL"
    results = await database_znakhidky.fetch_all(query=query)
    
    # Трансформуємо дані у потрібний для фронтенду формат
    formatted_results = [
        {
            "id": r["id"],
            "title": r["title"],
            "coordinates": [r["location_y"], r["location_x"]],
            # ДОДАНО: Передаємо нові поля у відповідь
            "photo_url": r["photo_url"],
            "location": r["location"],
        }
        for r in results
    ]
    return formatted_results

# Цей ендпоінт залишається без змін
@router.get("/{artifact_id}", response_model=ArtifactDetails)
async def get_artifact_by_id(artifact_id: int):
    query_artifact = "SELECT * FROM znakhidky WHERE id = :id"
    artifact = await database_znakhidky.fetch_one(query=query_artifact, values={"id": artifact_id})
    
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")

    artifact_dict = dict(artifact)
    
    style_name = None
    if artifact_dict.get("style_id"):
        query_style = "SELECT name FROM styles WHERE id = :id"
        style_result = await database_styles.fetch_one(query=query_style, values={"id": artifact_dict["style_id"]})
        if style_result:
            style_name = style_result["name"]

    return {
        "id": artifact_dict["id"],
        "title": artifact_dict["title"],
        "location": artifact_dict["location"],
        "coordinates": [artifact_dict["location_y"], artifact_dict["location_x"]],
        "style_id": artifact_dict["style_id"],
        "styleName": style_name,
        "description": artifact_dict["description"],
        "source_url": artifact_dict["source_url"],
        "photo_url": artifact_dict["photo_url"],
        "ornament_photo_url": artifact_dict["ornament_photo_url"],
    }