from fastapi import FastAPI, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from .database import get_db, Base, engine
from .etl import upsert_weather_data
from .auth import create_access_token, get_current_user
from .models import Weather
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

@app.get("/weather")
async def get_weather(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    weather_data = db.query(Weather).filter(Weather.city == "Aberdeen").order_by(Weather.timestamp.desc()).all()
    return [{"city": w.city, "timestamp": w.timestamp, "temperature": w.temperature, "humidity": w.humidity} for w in weather_data]

@app.post("/fetch-weather")
async def fetch_weather(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    background_tasks.add_task(upsert_weather_data, db)
    return {"message": "Weather data fetch scheduled"}