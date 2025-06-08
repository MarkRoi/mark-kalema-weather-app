from sqlalchemy import Column, Integer, Float, String, DateTime
from .database import Base

class Weather(Base):
    __tablename__ = "weather"
    
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    timestamp = Column(DateTime)
    temperature = Column(Float)
    humidity = Column(Float)