import requests
from sqlalchemy.orm import Session
from datetime import datetime
import time
from .models import Weather

# Open-Meteo API for Aberdeen (lat=57.1497, lon=-2.0943)
API_URL = "https://api.open-meteo.com/v1/forecast?latitude=57.1497&longitude=-2.0943&current=temperature_2m,relative_humidity_2m"

def fetch_weather_data(max_retries=3, backoff_factor=2):
    for attempt in range(max_retries):
        try:
            response = requests.get(API_URL, timeout=10)
            response.raise_for_status()
            data = response.json()
            current = data["current"]
            return {
                "temperature": current["temperature_2m"],
                "humidity": current["relative_humidity_2m"],
                "timestamp": datetime.fromisoformat(current["time"])
            }
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(backoff_factor ** attempt)
    return None

def upsert_weather_data(db: Session):
    weather_data = fetch_weather_data()
    if not weather_data:
        return None
    
    # Update if exists, insert if not
    existing = db.query(Weather).filter(
        Weather.city == "Aberdeen",
        Weather.timestamp == weather_data["timestamp"]
    ).first()
    
    if existing:
        existing.temperature = weather_data["temperature"]
        existing.humidity = weather_data["humidity"]
    else:
        new_weather = Weather(
            city="Aberdeen",
            timestamp=weather_data["timestamp"],
            temperature=weather_data["temperature"],
            humidity=weather_data["humidity"]
        )
        db.add(new_weather)
    db.commit()
    return weather_data