import os
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = SECRET_KEY = os.getenv("SECRET_KEY","58032f8b7c0d2cc1c64f6eefe435cdb76075cd491547c36aabbb8c0f43b0a900")  # Replace with your SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

token = jwt.encode({"sub": "demo_user", "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)}, SECRET_KEY, algorithm=ALGORITHM)
print(token)