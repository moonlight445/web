from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from backend.database import AniTasteDB

app = FastAPI()
db = AniTasteDB()


# Схемы данных для валидации запросов
class UserRegister(BaseModel):
    username: str
    password: str
    favorite_genres: Optional[str] = None


class GenreUpdate(BaseModel):
    user_id: int
    new_genres: str


# Эндпоинт для регистрации (связь с фронтенд-формой)
@app.post("/register")
def register(user: UserRegister):
    success = db.register_user(user.username, user.password, user.favorite_genres)
    if not success:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    return {"message": "Пользователь успешно создан"}


# Эндпоинт для получения данных пользователя
@app.get("/user/{username}")
def get_user(username: str):
    user_data = db.get_user_data(username)
    if not user_data:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    # Формируем красивый JSON для фронтенда
    return {
        "id": user_data[0],
        "username": user_data[1],
        "genres": user_data[3],
        "created_at": user_data[4],
    }


# Эндпоинт для обновления жанров
@app.put("/update_genres")
def update_genres(data: GenreUpdate):
    db.update_genres(data.user_id, data.new_genres)
    return {"status": "success", "message": "Жанры обновлены"}


# Запуск сервера: uvicorn main:app --reload
