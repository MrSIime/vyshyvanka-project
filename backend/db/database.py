import sqlite3
import json
from models import create_empty_znakhidky_db_single_table, create_empty_styles_db_single_table

def populate_styles_from_json(json_file_path):
    conn = None
    try:
        create_empty_styles_db_single_table()
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        conn = sqlite3.connect('styles_db_single_table.db')
        cursor = conn.cursor()
        cursor.execute('DELETE FROM styles')
        print("Table 'styles' cleared before insertion.")
        for style in data:
            sql = '''INSERT INTO styles(name, description, key_elements, technique, key_colors, marker_color)
                     VALUES(?, ?, ?, ?, ?, ?)'''
            key_elements_json = json.dumps(style.get('key_elements', []), ensure_ascii=False)
            key_colors_list = style.get('key_colors', [])
            key_colors_json = json.dumps(key_colors_list, ensure_ascii=False)
            marker_color_hex = key_colors_list[0].get('hex') if key_colors_list and isinstance(key_colors_list[0], dict) else '#000000'
            values = (
                style.get('name', None),
                style.get('description', None),
                key_elements_json,
                style.get('technique', None),
                key_colors_json,
                marker_color_hex
            )
            cursor.execute(sql, values)
        conn.commit()
        print(f"Data from {json_file_path} successfully added to 'styles' table.")
    except FileNotFoundError:
        print(f"Error: Styles JSON file not found at {json_file_path}")
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse styles JSON file {json_file_path}. Error: {e}")
    except sqlite3.Error as e:
        print(f"SQLite error with styles: {e}")
    except Exception as e:
        print(f"Unexpected error with styles: {e}")
    finally:
        if conn:
            conn.close()

def populate_znakhidky_from_json(json_file_path):
    conn = None
    try:
        create_empty_znakhidky_db_single_table()
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        conn = sqlite3.connect('znakhidky_db_single_table.db')
        cursor = conn.cursor()
        cursor.execute('DELETE FROM znakhidky')
        print("Table 'znakhidky' cleared before insertion.")
        for artifact in data:
            sql = '''INSERT INTO znakhidky(title, location, location_x, location_y, style_id, description, source_url, photo_url)
                     VALUES(?, ?, ?, ?, ?, ?, ?, ?)'''
            values = (
                artifact.get('title', None),
                artifact.get('location', None),
                artifact.get('location_x', None),
                artifact.get('location_y', None),
                artifact.get('style_id', None),
                artifact.get('description', None),
                artifact.get('source_url', None),
                artifact.get('photo_url', None)
            )
            cursor.execute(sql, values)
        conn.commit()
        print(f"Data from {json_file_path} successfully added to 'znakhidky' table.")
    except FileNotFoundError:
        print(f"Error: Artifacts JSON file not found at {json_file_path}")
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse artifacts JSON file {json_file_path}. Error: {e}")
    except sqlite3.Error as e:
        print(f"SQLite error with artifacts: {e}")
    except Exception as e:
        print(f"Unexpected error with artifacts: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    print("Select action:")
    print("1: Create/Check 'znakhidky' DB")
    print("2: Create/Check 'styles' DB")
    print("3: Populate 'styles' from JSON")
    print("4: Populate 'znakhidky' from JSON")

    choice = input("Choice (1-4): ")

    if choice == '1':
        create_empty_znakhidky_db_single_table()
        print("Done.")
    elif choice == '2':
        create_empty_styles_db_single_table()
        print("Done.")
    elif choice == '3':
        json_path = input("Styles JSON path (default 'styles.json'): ") or 'styles.json'
        populate_styles_from_json(json_path)
    elif choice == '4':
        json_path = input("Artifacts JSON path (default 'artifacts_data.json'): ") or 'artifacts_data.json'
        populate_znakhidky_from_json(json_path)
    else:
        print("Invalid choice.")