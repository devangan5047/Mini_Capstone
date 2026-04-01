from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import db
from app.controllers.auth_controller import router as auth_router
from app.controllers.ticket_controller import router as ticket_router
from app.controllers.assignment_controller import router as assignment_router
from app.controllers.dashboard_controller import router as dashboard_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Telecom Fault API Running "}

@app.get("/test-db")
def test_db():
    try:
        collections = db.list_collection_names()
        return {
            "status": "connected",
            "collections": collections
        }
    except Exception as e:
        return {"error": str(e)}
    

app.include_router(auth_router)
app.include_router(ticket_router)
app.include_router(assignment_router)
app.include_router(dashboard_router)
