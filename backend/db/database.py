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
        print("styles cleaned up")


        for style in data:
            sql = '''INSERT INTO styles(name, description, key_elements, technique, key_colors) 
                     VALUES(?, ?, ?, ?, ?)'''
            
            key_elements_json = json.dumps(style.get('key_elements', []), ensure_ascii=False)
            key_colors_json = json.dumps(style.get('key_colors', []), ensure_ascii=False)
            
            values = (
                style.get('name', None),
                style.get('description', None),
                key_elements_json,
                style.get('technique', None),
                key_colors_json
            )
            cursor.execute(sql, values)

        conn.commit()
        print(f"{json_file_path} added")

    except FileNotFoundError:
        print(f"json wasn't found {json_file_path}")
    except json.JSONDecodeError as e:
        print(f"json didn't decode {json_file_path}. error: {e}")
    except sqlite3.Error as e:
        print(f"sqlite error: {e}")
    except Exception as e:
        print(f"unexpected error: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    print("дія:")
    print("1: Створити базу даних znakhidky")
    print("2: Створити базу даних styles")
    print("3: Заповнити 'styles' з JSON")
    
    choice = input("1/2/3: ")

    if choice == '1':
        create_empty_znakhidky_db_single_table()
        print("y")
    elif choice == '2':
        create_empty_styles_db_single_table()
        print("y")
    elif choice == '3':
        json_path = input("json path ('styles.json'): ") or 'styles.json'
        populate_styles_from_json(json_path)