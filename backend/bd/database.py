# db_operations.py
import sqlite3
import json

# --- Конфігурація файлів баз даних ---
ZNAKHIDKY_DB = 'znakhidky_db_single_table.db'
STYLES_DB = 'styles_db_single_table.db'

# --- Допоміжні функції (для повторного використання) ---
def get_db_connection(db_path):
    """Повертає об'єкт з'єднання з базою даних."""
    return sqlite3.connect(db_path)

def execute_query(db_path, query, params=()):
    """Виконує SQL-запит і повертає результат (якщо є)."""
    conn = None
    try:
        conn = get_db_connection(db_path)
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        return cursor
    except sqlite3.Error as e:
        print(f"Помилка SQLite: {e}")
        return None
    finally:
        if conn:
            conn.close()

def fetch_all(db_path, query, params=()):
    """Виконує SQL-запит і повертає всі отримані рядки."""
    conn = None
    try:
        conn = get_db_connection(db_path)
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchall()
    except sqlite3.Error as e:
        print(f"Помилка SQLite: {e}")
        return []
    finally:
        if conn:
            conn.close()

def fetch_one(db_path, query, params=()):
    """Виконує SQL-запит і повертає один отриманий рядок."""
    conn = None
    try:
        conn = get_db_connection(db_path)
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchone()
    except sqlite3.Error as e:
        print(f"Помилка SQLite: {e}")
        return None
    finally:
        if conn:
            conn.close()

# --- Функції для взаємодії з таблицею ZNAKHIDKY ---

def add_znakhidka():
    print("\n--- Додавання нової знахідки ---")
    title = input("Назва знахідки (title): ")
    if not title:
        print("Назва не може бути порожньою. Операцію скасовано.")
        return

    location = input("Місцезнаходження (location): ")
    location_x_str = input("Широта (location_x, напр. 49.8397, залиште пустим якщо немає): ")
    location_y_str = input("Довгота (location_y, напр. 24.0297, залиште пустим якщо немає): ")
    
    location_x = None
    location_y = None
    try:
        if location_x_str:
            location_x = float(location_x_str)
        if location_y_str:
            location_y = float(location_y_str)
    except ValueError:
        print("Помилка: Некоректний формат координат. Координати будуть проігноровані.")

    style_id = input("ID/Назва стилю (style_id): ")
    description = input("Опис (description): ")
    source_url = input("Посилання на джерело (source_url): ")
    photo_url = input("Посилання на фото (photo_url): ")
    ornament_photo_url = input("Посилання на фото орнаменту (ornament_photo_url): ")

    query = '''
        INSERT INTO znakhidky (title, location, location_x, location_y, style_id, description, source_url, photo_url, ornament_photo_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    '''
    params = (title, location, location_x, location_y, style_id, description, source_url, photo_url, ornament_photo_url)
    
    if execute_query(ZNAKHIDKY_DB, query, params):
        print("Знахідку успішно додано!")

def show_znakhidky():
    rows = fetch_all(ZNAKHIDKY_DB, "SELECT * FROM znakhidky")

    if not rows:
        print("\nУ таблиці 'znakhidky' немає записів.")
        return

    print("\n--- Усі знахідки ---")
    for row in rows:
        print(f"ID: {row[0]}")
        print(f"  Назва: {row[1]}")
        print(f"  Місце: {row[2]}")
        print(f"  Коорд: ({row[3] if row[3] is not None else 'N/A'}, {row[4] if row[4] is not None else 'N/A'})")
        print(f"  Стиль ID: {row[5] if row[5] else 'N/A'}")
        print(f"  Опис: {row[6][:70]}..." if row[6] else "N/A")
        print(f"  Джерело: {row[7] if row[7] else 'N/A'}")
        print(f"  Фото: {row[8] if row[8] else 'N/A'}")
        print(f"  Фото орнаменту: {row[9] if row[9] else 'N/A'}\n")

def update_znakhidka_interactive():
    znakhidka_id_str = input("\nВведіть ID знахідки, яку хочете змінити: ")
    try:
        znakhidka_id = int(znakhidka_id_str)
    except ValueError:
        print("Некоректний ID. Операцію скасовано.")
        return

    znakhidka = fetch_one(ZNAKHIDKY_DB, "SELECT * FROM znakhidky WHERE id = ?", (znakhidka_id,))

    if not znakhidka:
        print(f"Знахідка з ID {znakhidka_id} не знайдена.")
        return

    column_names = [
        "id", "title", "location", "location_x", "location_y", "style_id",
        "description", "source_url", "photo_url", "ornament_photo_url"
    ]
    
    print(f"\nПоточні значення для знахідки ID {znakhidka_id}:")
    for i, col_name in enumerate(column_names):
        if i == 0: continue
        print(f"{i}. {col_name}: {znakhidka[i]}")

    field_to_update_str = input("Введіть номер поля, яке хочете змінити (або 0 для скасування): ")
    try:
        field_index = int(field_to_update_str)
    except ValueError:
        print("Некоректний номер поля. Операцію скасовано.")
        return

    if field_index == 0:
        print("Операцію скасовано.")
        return
    elif not (1 <= field_index < len(column_names)):
        print("Некоректний номер поля.")
        return

    selected_column_name = column_names[field_index]
    current_value = znakhidka[field_index]

    new_value_str = input(f"Введіть нове значення для '{selected_column_name}' (поточне: {current_value}): ")
    
    new_value = new_value_str
    if new_value_str.strip() == "":
        new_value = None
    elif selected_column_name in ["location_x", "location_y"]:
        try:
            new_value = float(new_value_str)
        except ValueError:
            print(f"Помилка: Некоректний формат числа для '{selected_column_name}'. Зміна не виконана.")
            return

    query = f"UPDATE znakhidky SET {selected_column_name} = ? WHERE id = ?"
    params = (new_value, znakhidka_id)
    
    if execute_query(ZNAKHIDKY_DB, query, params):
        print(f"Поле '{selected_column_name}' для знахідки ID {znakhidka_id} успішно оновлено.")

def delete_znakhidka():
    print("\n--- Видалення знахідки ---")
    znakhidka_id_str = input("Введіть ID знахідки, яку хочете видалити: ")
    try:
        znakhidka_id = int(znakhidka_id_str)
    except ValueError:
        print("Некоректний ID. Операцію скасовано.")
        return

    confirm = input(f"Ви впевнені, що хочете видалити знахідку з ID {znakhidka_id}? (так/ні): ").lower()
    if confirm == 'так':
        query = "DELETE FROM znakhidky WHERE id = ?"
        if execute_query(ZNAKHIDKY_DB, query, (znakhidka_id,)):
            print(f"Знахідку з ID {znakhidka_id} успішно видалено.")
    else:
        print("Видалення скасовано.")

def import_znakhidky_from_json(file_path):
    print(f"\n--- Імпорт знахідок з JSON файлу: {file_path} ---")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if not isinstance(data, list):
            print("Помилка: JSON файл має містити список об'єктів.")
            return

        conn = get_db_connection(ZNAKHIDKY_DB)
        cursor = conn.cursor()
        
        for item in data:
            title = item.get('title')
            if not title:
                print(f"Помилка: Пропущено 'title' для елемента. Елемент буде пропущено: {item}")
                continue

            location_x = item.get('location_x')
            location_y = item.get('location_y')

            # Перевірка та конвертація координат у float
            try:
                if location_x is not None:
                    location_x = float(location_x)
            except ValueError:
                print(f"Помилка: Некоректний формат location_x для '{title}'. Встановлено NULL.")
                location_x = None
            try:
                if location_y is not None:
                    location_y = float(location_y)
            except ValueError:
                print(f"Помилка: Некоректний формат location_y для '{title}'. Встановлено NULL.")
                location_y = None

            query = '''
                INSERT INTO znakhidky (title, location, location_x, location_y, style_id, description, source_url, photo_url, ornament_photo_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            '''
            params = (
                item.get('location'),
                location_x,
                location_y,
                item.get('style_id'),
                item.get('description'),
                item.get('source_url'),
                item.get('photo_url'),
                item.get('ornament_photo_url')
            )
            # Зауваження: item.get('title') вже використовується, тому тут треба коректно передати всі параметри
            # Правильні параметри для INSERT
            params = (
                title,
                item.get('location'),
                location_x,
                location_y,
                item.get('style_id'),
                item.get('description'),
                item.get('source_url'),
                item.get('photo_url'),
                item.get('ornament_photo_url')
            )
            cursor.execute(query, params)
        
        conn.commit()
        print(f"Імпорт {len(data)} знахідок завершено!")

    except FileNotFoundError:
        print(f"Помилка: Файл '{file_path}' не знайдено.")
    except json.JSONDecodeError:
        print(f"Помилка: Некоректний формат JSON у файлі '{file_path}'.")
    except sqlite3.Error as e:
        print(f"Помилка SQLite при імпорті знахідок: {e}")
    finally:
        if conn:
            conn.close()


# --- Функції для взаємодії з таблицею STYLES ---

def add_style():
    print("\n--- Додавання нового стилю ---")
    name = input("Назва стилю (name): ")
    if not name:
        print("Назва стилю не може бути порожньою. Операцію скасовано.")
        return

    description = input("Опис (description): ")
    key_elements = input("Ключові елементи (key_elements): ")
    technique = input("Техніка (technique): ")
    key_colors = input("Ключові кольори (key_colors): ")
    photos_urls = input("Посилання на фото (photos_urls): ")

    query = '''
        INSERT INTO styles (name, description, key_elements, technique, key_colors, photos_urls)
        VALUES (?, ?, ?, ?, ?, ?)
    '''
    params = (name, description, key_elements, technique, key_colors, photos_urls)
    
    if execute_query(STYLES_DB, query, params):
        print("Стиль успішно додано!")

def show_styles():
    rows = fetch_all(STYLES_DB, "SELECT * FROM styles")

    if not rows:
        print("\nУ таблиці 'styles' немає записів.")
        return

    print("\n--- Усі стилі ---")
    for row in rows:
        print(f"ID: {row[0]}")
        print(f"  Назва: {row[1]}")
        print(f"  Опис: {row[2][:70]}..." if row[2] else "N/A")
        print(f"  Ключові елементи: {row[3][:50]}..." if row[3] else "N/A")
        print(f"  Техніка: {row[4] if row[4] else 'N/A'}")
        print(f"  Ключові кольори: {row[5] if row[5] else 'N/A'}")
        print(f"  Фото: {row[6] if row[6] else 'N/A'}\n")

def update_style_interactive():
    style_id_str = input("\nВведіть ID стилю, який хочете змінити: ")
    try:
        style_id = int(style_id_str)
    except ValueError:
        print("Некоректний ID. Операцію скасовано.")
        return

    style = fetch_one(STYLES_DB, "SELECT * FROM styles WHERE id = ?", (style_id,))

    if not style:
        print(f"Стиль з ID {style_id} не знайдений.")
        return

    column_names = [
        "id", "name", "description", "key_elements", "technique", "key_colors", "photos_urls"
    ]

    print(f"\nПоточні значення для стилю ID {style_id}:")
    for i, col_name in enumerate(column_names):
        if i == 0: continue
        print(f"{i}. {col_name}: {style[i]}")

    field_to_update_str = input("Введіть номер поля, яке хочете змінити (або 0 для скасування): ")
    try:
        field_index = int(field_to_update_str)
    except ValueError:
        print("Некоректний номер поля. Операцію скасовано.")
        return

    if field_index == 0:
        print("Операцію скасовано.")
        return
    elif not (1 <= field_index < len(column_names)):
        print("Некоректний номер поля.")
        return

    selected_column_name = column_names[field_index]
    current_value = style[field_index]

    new_value_str = input(f"Введіть нове значення для '{selected_column_name}' (поточне: {current_value}): ")
    
    new_value = new_value_str
    if new_value_str.strip() == "":
        new_value = None

    query = f"UPDATE styles SET {selected_column_name} = ? WHERE id = ?"
    params = (new_value, style_id)
    
    if execute_query(STYLES_DB, query, params):
        print(f"Поле '{selected_column_name}' для стилю ID {style_id} успішно оновлено.")

def delete_style():
    print("\n--- Видалення стилю ---")
    style_id_str = input("Введіть ID стилю, який хочете видалити: ")
    try:
        style_id = int(style_id_str)
    except ValueError:
        print("Некоректний ID. Операцію скасовано.")
        return

    confirm = input(f"Ви впевнені, що хочете видалити стиль з ID {style_id}? (так/ні): ").lower()
    if confirm == 'так':
        query = "DELETE FROM styles WHERE id = ?"
        if execute_query(STYLES_DB, query, (style_id,)):
            print(f"Стиль з ID {style_id} успішно видалено.")
    else:
        print("Видалення скасовано.")

def import_styles_from_json(file_path):
    print(f"\n--- Імпорт стилів з JSON файлу: {file_path} ---")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if not isinstance(data, list):
            print("Помилка: JSON файл має містити список об'єктів.")
            return

        conn = get_db_connection(STYLES_DB)
        cursor = conn.cursor()
        
        for item in data:
            name = item.get('name')
            if not name:
                print(f"Помилка: Пропущено 'name' для елемента. Елемент буде пропущено: {item}")
                continue

            query = '''
                INSERT INTO styles (name, description, key_elements, technique, key_colors, photos_urls)
                VALUES (?, ?, ?, ?, ?, ?)
            '''
            params = (
                name,
                item.get('description'),
                item.get('key_elements'),
                item.get('technique'),
                item.get('key_colors'),
                item.get('photos_urls')
            )
            cursor.execute(query, params)
        
        conn.commit()
        print(f"Імпорт {len(data)} стилів завершено!")

    except FileNotFoundError:
        print(f"Помилка: Файл '{file_path}' не знайдено.")
    except json.JSONDecodeError:
        print(f"Помилка: Некоректний формат JSON у файлі '{file_path}'.")
    except sqlite3.Error as e:
        print(f"Помилка SQLite при імпорті стилів: {e}")
    finally:
        if conn:
            conn.close()

# --- Головне меню взаємодії ---

def display_operations_menu(db_name):
    print(f"\n--- Операції для таблиці '{db_name}' ---")
    print("1. Додати елемент")
    print("2. Показати всі елементи")
    print("3. Змінити елемент (інтерактивно)")
    print("4. Видалити елемент")
    print("5. Імпортувати дані з JSON файлу")
    print("0. Повернутися до вибору таблиці")

def main_menu():
    while True:
        print("\n--- Виберіть базу даних для взаємодії ---")
        print("1. Таблиця 'znakhidky'")
        print("2. Таблиця 'styles'")
        print("0. Вихід")

        choice_db = input("Ваш вибір: ")

        if choice_db == '1':
            current_db_name = "znakhidky"
            operations = {
                '1': add_znakhidka,
                '2': show_znakhidky,
                '3': update_znakhidka_interactive,
                '4': delete_znakhidka,
                '5': lambda: import_znakhidky_from_json(input("Введіть шлях до JSON файлу для знахідок: "))
            }
        elif choice_db == '2':
            current_db_name = "styles"
            operations = {
                '1': add_style,
                '2': show_styles,
                '3': update_style_interactive,
                '4': delete_style,
                '5': lambda: import_styles_from_json(input("Введіть шлях до JSON файлу для стилів: "))
            }
        elif choice_db == '0':
            print("Вихід з програми.")
            break
        else:
            print("Некоректний вибір бази даних. Спробуйте ще.")
            continue

        while True:
            display_operations_menu(current_db_name)
            choice_action = input("Ваш вибір: ")

            if choice_action == '0':
                break
            elif choice_action in operations:
                operations[choice_action]()
            else:
                print("Некоректний вибір дії. Спробуйте ще.")

if __name__ == "__main__":
    main_menu()