from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from db.database import database_znakhidky

class Coords(BaseModel):
    id: int
    location_y: Optional[float] = None
    location_x: Optional[float] = None

router = APIRouter(prefix="/api/artifacts", tags=["Artifacts"])

@router.get("", response_model=List[Coords])
async def get_coords():
    query = "SELECT id, location_y, location_x FROM znakhidky WHERE location_y IS NOT NULL AND location_x IS NOT NULL"
    results = await database_znakhidky.fetch_all(query=query)
    return results if results else []

# @router.get("/{item_id}")
# async def get_item(item_id: int):
#     query = "SELECT * FROM znakhidky WHERE id = :id"
#     result = await database_znakhidky.fetch_one(query=query, values={"id": item_id})
#     if not result:
#         raise HTTPException(status_code=404, detail="Not found")
#     return result