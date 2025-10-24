import sqlite3
from typing import List, Dict, Any

DB_NAME = "znakhidky_db_single_table.db"

def get_findings_from_db() -> List[Dict[str, Any]]:
    findings_list = []
    try:
        conn = sqlite3.connect(DB_NAME)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT id, title, location_x, location_y FROM your_table_name")
        rows = cursor.fetchall()

        for row in rows:
            findings_list.append(dict(row))

    except sqlite3.Error as e:
        print(f"Помилка бази даних: {e}")
        return []
    finally:
        if conn:
            conn.close()

    return findings_list
