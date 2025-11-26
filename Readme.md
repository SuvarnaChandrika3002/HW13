HW13 – FastAPI + JWT Auth + Docker + Playwright + CI/CD
Overview

This project implements a FastAPI backend with:

User registration & login (JWT Authentication)

CRUD endpoints for calculations

SQLite database with SQLAlchemy

Docker + Docker Compose support

Automated testing (pytest + Playwright)

Full CI/CD pipeline to GitHub Actions + Docker Hub

How to Run the Project
1. Run using uvicorn
uvicorn app.main:app --reload


App runs at:

http://localhost:8000

2. Run using Docker

Build:

docker build -t hw13 .
Run:

docker run -p 8000:8000 hw13

3. Run using docker-compose
docker-compose up --build

User Authentication (JWT)
Register:
POST /register
{
  "email": "user@example.com",
  "password": "1234"
}

Login:
POST /login
{
  "email": "user@example.com",
  "password": "1234"
}

Response:
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}

Testing
Run backend unit tests
pytest

Run Playwright E2E tests

Run tests:

pytest --headed

Manual Testing via OpenAPI

Open the docs at:

http://localhost:8000/docs

You can test:

/register

/login

/calculations CRUD

JWT authorization using “Authorize” button

CI/CD Pipeline

GitHub Actions runs automatically on each push:

CI Workflow → runs pytest

Docker Workflow → builds Docker image and pushes to Docker Hub:

sc673/hw13:latest

Running Image from Docker Hub
docker pull sc673/hw13:latest
docker run -p 8000:8000 sc673/hw13:latest

Add more Playwright tests

Deploy to a server (Railway, Render, Fly.io, AWS)

Add frontend

Improve database models

