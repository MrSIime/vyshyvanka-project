import os
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

key = "AIzaSyAznnbuLa9qYVADHSBG0-nDyXowbBDtn-s"

try:
    client = genai.Client(api_key=key) 
except Exception as e:
    print(f"Помилка ініціалізації Gemini Client: {e}")
    raise RuntimeError("Не вдалося підключитися до Gemini API. Перевірте ключ, переданий в genai.Client().")

def generate_text_from_multimodal(image_bytes: bytes, prompt_text: str) -> str:
    """
    Запит 1: Текст + Фото -> Текст (Температура 0.0)
    ...
    """
    img = Image.open(BytesIO(image_bytes))
    config = types.GenerateContentConfig(
        temperature=0.0
    )
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[prompt_text, img],
        config=config
    )
    return response.text
