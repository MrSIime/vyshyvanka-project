import os
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY_CONTAIN")

try:
    client = genai.Client(api_key=api_key) 
except Exception as e:
    print(f"Помилка ініціалізації Gemini Client: {e}")
    raise RuntimeError("Не вдалося підключитися до Gemini API. Перевірте ключ, переданий в genai.Client().")

prompt_text="""
if the photo contains embroidery, then display the symbol '+'
otherwise - display '-'
"""

def if_contain(image_bytes: bytes) -> str:
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