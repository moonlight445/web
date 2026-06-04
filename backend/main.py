import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from backend.main_app import app

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run("backend.main_app:app")
