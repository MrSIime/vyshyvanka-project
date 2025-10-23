import databases
import os

DB_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE_URL_ZNAKHIDKY = f"sqlite+aiosqlite:///{os.path.join(DB_DIR, 'znakhidky_db_single_table.db')}"
DATABASE_URL_STYLES = f"sqlite+aiosqlite:///{os.path.join(DB_DIR, 'styles_db_single_table.db')}"

database_znakhidky = databases.Database(DATABASE_URL_ZNAKHIDKY)
database_styles = databases.Database(DATABASE_URL_STYLES)

async def connect_databases():
    await database_znakhidky.connect()
    await database_styles.connect()

async def disconnect_databases():
    await database_znakhidky.disconnect()
    await database_styles.disconnect()