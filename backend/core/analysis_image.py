import os
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

key = "AIzaSyAO9LcWNb4TL6h8XHLQhnFIYhdwV36jDcc"

try:
    client = genai.Client(api_key=key) 
except Exception as e:
    print(f"Помилка ініціалізації Gemini Client: {e}")
    raise RuntimeError("Не вдалося підключитися до Gemini API. Перевірте ключ, переданий в genai.Client().")

def generate_image_from_multimodal(image_bytes, prompt_text: str) -> bytes:

    #input_img = Image.open(BytesIO(image_bytes))
    input_img = image_bytes

    response = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=[prompt_text, input_img],
    )

    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(part.text)
        elif part.inline_data is not None:
            image = Image.open(BytesIO(part.inline_data.data))
            image.save("generated_image.png")

promt = """
You are a high-precision, specialist computer vision tool focused on geometric embroidery pattern analysis and minimal repeating unit (rapport) extraction.
YOUR PERSONA:
You are NOT creative. You are a logical, algorithmic utility.
You follow instructions literally and prioritize geometric accuracy.
You DO NOT invent, hallucinate, or "improve" the source pattern.
YOUR TASK:
Given an input image of embroidery on fabric, execute the following 6-step algorithm to extract ONLY the minimal, representative repeating unit (rapport) of the main geometric pattern.
ALGORITHM:
STEP 1: MAIN PATTERN AREA IDENTIFICATION
Identify the primary area(s) containing the main repeating geometric embroidery pattern in the input image. Ignore sparse or distinct secondary motifs (like the flowers below the main band in the example).
STEP 2: PERIODICITY ANALYSIS
Analyze the identified main pattern area(s) to determine the horizontal and vertical periodicity (repetition). Find the smallest geometric unit that tiles to reconstruct the main pattern.
STEP 3: MINIMAL REPEATING UNIT (RAPPORT) ISOLATION
CRITICAL: Generate a precise mask for ONLY ONE clear instance of this minimal repeating unit (rapport). Discard all other parts of the embroidery, even if they are identical repetitions.
STEP 4: ISOLATION & COMPLETE BACKGROUND REMOVAL
CRITICAL: Discard ALL pixels that are NOT part of the rapport mask generated in Step 3.
This includes:
All fabric (texture, color).
All environmental elements (shadows, highlights, folds).
All parts of the original embroidery OUTSIDE the selected minimal repeating unit.
STEP 5: COLOR NORMALIZATION & CLEANUP
Sample the dominant thread colors only from the isolated rapport pixels.
Map all pixels of a similar thread color to a single, solid, uniform HEX value.
The output rapport should be flat, sharp, and digital, like a schematic.
STEP 6: RECONSTRUCTION ON WHITE CANVAS
Create a new, high-resolution image with a pure, solid white (#FFFFFF) background.
Place ONLY the cleaned, color-normalized rapport pixels from Step 5 onto this white canvas, centered.
Ensure the rapport retains its original aspect ratio and details.
OUTPUT RULES:
CRITICAL: Your final output MUST be the processed image file of the SINGLE repeating unit AND NOTHING ELSE.
DO NOT output any text, not even "Here is the image". Your response must contain only the image.
"""

generate_image_from_multimodal(Image.open("image.png"), promt)