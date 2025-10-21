import sqlite3

def create_empty_znakhidky_db_single_table():
    conn = None
    try:
        conn = sqlite3.connect('znakhidky_db_single_table.db')
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS znakhidky (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                location TEXT,
                location_x REAL,
                location_y REAL,
                style_id INTEGER,
                description TEXT,
                source_url TEXT,
                photo_url TEXT,
                ornament_photo_url TEXT
            )
        ''')

        conn.commit()

    except sqlite3.Error as e:
        print(f"Помилка SQLite: {e}")
    finally:
        if conn:
            conn.close()

def create_empty_styles_db_single_table():
    conn = None
    try:

        conn = sqlite3.connect('styles_db_single_table.db')
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS styles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                key_elements TEXT,
                technique TEXT,
                key_colors TEXT,
                photos_urls TEXT
            )
        ''')

        conn.commit()

    except sqlite3.Error as e:
        print(f"Помилка SQLite: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    if int(input())==1:
        create_empty_znakhidky_db_single_table()
    else:
        create_empty_styles_db_single_table()