from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # В продакшене укажите адрес вашего фронтенда
    allow_methods=["*"],
    allow_headers=["*"],
)