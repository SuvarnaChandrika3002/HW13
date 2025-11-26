from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .database import Base, engine
from .routers import users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="JWT Auth Example")

# static HTML pages
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# API routes
app.include_router(users.router)


@app.get("/")
def read_root():
    return {"message": "OK"}
