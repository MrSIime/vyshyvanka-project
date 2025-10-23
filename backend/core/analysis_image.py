import base64
import mimetypes
import os
from google import genai
from google.genai import types
from PIL import Image
import io
from dotenv import load_dotenv

def save_binary_file(file_name, data):
    """Saves binary data to a file."""
    with open(file_name, "wb") as f:
        f.write(data)
    print(f"File saved to: {file_name}")


def generate(image_path, prompt, output_filename):
    """
    Generates an image based on an input image and a text prompt.

    Args:
        image_path (str): The path to the input image file.
        prompt (str): The text prompt to guide the image generation.
        output_filename (str): The base name for the output file.
    """

    load_dotenv()
    api_key = os.getenv("API_KEY_IMAGE")

    client = genai.Client(
        api_key=api_key
    )

    try:
        img = Image.open(image_path)
    except FileNotFoundError:
        print(f"Error: The file '{image_path}' was not found.")
        return

    model = "gemini-2.5-flash-image"

    contents = [
        types.Part.from_text(text=prompt),
        img
    ]

    generate_content_config = types.GenerateContentConfig(
        response_modalities=[
            "IMAGE",
            "TEXT",
        ],
    )

    file_index = 0
    print("Generating content...")
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if (
            chunk.candidates is None
            or chunk.candidates[0].content is None
            or chunk.candidates[0].content.parts is None
        ):
            continue

        part = chunk.candidates[0].content.parts[0]
        if part.inline_data and part.inline_data.data:
            inline_data = part.inline_data
            data_buffer = inline_data.data
            mime_type = inline_data.mime_type
            file_extension = mimetypes.guess_extension(mime_type)
            if not file_extension:
                file_extension = ".png"
            
            save_filename = f"{output_filename}_{file_index}{file_extension}"
            save_binary_file(save_filename, data_buffer)
            file_index += 1
        elif chunk.text:
            print(chunk.text)

if __name__ == "__main__":
    input_image_path = "image.png"

    input_prompt = """You are a high-precision, specialist computer vision tool focused on geometric embroidery pattern analysis and minimal repeating unit (rapport) extraction.
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
DO NOT output any text, not even "Here is the image". Your response must contain only the image."""

    output_file_name_base = "generated_image"

    if input_image_path == "path_to_your_image.jpg":
        print("Please update the 'input_image_path' variable with the actual path to your image.")
    else:
        generate(input_image_path, input_prompt, output_file_name_base)