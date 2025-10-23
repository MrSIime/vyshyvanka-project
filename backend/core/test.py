import os
import analysis_logic
import analysis_image
from PIL import Image
from io import BytesIO
import tempfile
import sys

def create_dummy_image_bytes(filename="sample_image.jpg"):
    """
    Створює невелике тестове зображення (червоний квадрат) у пам'яті 
    і повертає його байти.
    """
    try:
        img = Image.new('RGB', (100, 100), color = 'red')
        
        byte_arr = BytesIO()
        img.save(byte_arr, format='JPEG')
        
        print(f"✅ Створено тестове зображення (байти): {len(byte_arr.getvalue())} байт.")
        return byte_arr.getvalue()
    except Exception as e:
        print(f"❌ Помилка при створенні тестового зображення: {e}")
        sys.exit(1)

def test_generate_text_from_multimodal(image_bytes: bytes):
    """Тестує функцію generate_text_from_multimodal."""
    print("\n" + "="*50)
    print("🚀 Тест 1: Зображення + Текст -> Текст")
    print("="*50)
    
    prompt = "Опиши, що ти бачиш на цьому зображенні, однією фразою українською мовою."
    print(f"Вхідний запит: '{prompt}'")
    
    try:
        generated_text = analysis_logic.generate_text_from_multimodal(
            image_bytes=image_bytes, 
            prompt_text=prompt
        )
        
        if generated_text and isinstance(generated_text, str):
            print("✅ Успіх: Згенеровано текст.")
            print(f"Згенерований текст: {generated_text[:100]}...")
        else:
            print("❌ Провал: Отримано некоректний результат (не рядок або порожній).")
            
    except Exception as e:
        print(f"❌ Провал тесту 1: Виникла помилка: {e}")
        print("Переконайтеся, що API-ключ дійсний.")


def test_generate_image_from_multimodal(image_bytes: bytes):
    """Тестує функцію generate_image_from_multimodal."""
    print("\n" + "="*50)
    print("🚀 Тест 2: Зображення + Текст -> Згенероване Зображення")
    print("="*50)

    prompt = "Перетвори це зображення на милу мультяшну ілюстрацію."
    print(f"Вхідний запит: '{prompt}'")
    
    try:
        generated_image_bytes = analysis_image.generate_image_from_multimodal(
            image_bytes=image_bytes, 
            prompt_text=prompt
        )
        
        if generated_image_bytes and isinstance(generated_image_bytes, bytes) and len(generated_image_bytes) > 100:
            print("✅ Успіх: Згенеровано байти зображення.")
            print(f"Розмір згенерованого зображення: {len(generated_image_bytes)} байт.")
            
            with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
                tmp.write(generated_image_bytes)
                print(f"🖼️ Збережено згенероване зображення до: {tmp.name}")
        else:
            print("❌ Провал: Отримано некоректний результат (не байти або занадто малий розмір).")

    except Exception as e:
        print(f"❌ Провал тесту 2: Виникла помилка: {e}")
        print("Ймовірна причина: недійсний ключ, невірна назва моделі ('gemini-2.5-flash-image') або модель не підтримує повернення зображень.")

# ------------------------------------------------------------------------------
# Основна логіка виконання
# ------------------------------------------------------------------------------

if __name__ == "__main__":
    
    # 1. Створення або завантаження тестового зображення
    try:
        test_image_bytes = create_dummy_image_bytes()
    except Exception as e:
        print(f"Критична помилка: {e}")
        sys.exit(1)
    
    # 2. Виконання тестів
    test_generate_text_from_multimodal(test_image_bytes)
    test_generate_image_from_multimodal(test_image_bytes)

    print("\n" + "="*50)
    print("Тестування завершено.")
    print("="*50)