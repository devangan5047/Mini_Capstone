from pymongo import MongoClient
from pymongo.errors import ConfigurationError
from app.core.config import settings

client = MongoClient(settings.MONGO_URL)

database_name = settings.DATABASE_NAME

if not database_name:
    try:
        default_database = client.get_default_database()
        database_name = default_database.name if default_database else None
    except ConfigurationError:
        database_name = None

if not database_name:
    raise ValueError("DATABASE_NAME must be set when the MongoDB URI does not include a database name")

db = client[database_name]

def get_db():
    return db
