from fastapi import APIRouter
import httpx
from pydantic import BaseModel
from typing import List

from config import settings


# Update the router to include the database session dependency
router = APIRouter(prefix="/api/v1/chat", tags=["Chat API v1"])


class Message(BaseModel):
    sender: str
    message: str


class ChatRequest(BaseModel):
    messages: List[Message]


@router.get("/status")
async def status() -> dict:
    return {"status": "ok"}


@router.post("/chat")
async def chat(request: ChatRequest) -> dict:
    """
    Process a chat request with conversation history and forward to CHAI API
    """
    # Convert our message format to CHAI's format
    chat_history = [{"sender": msg.sender.capitalize(), "message": msg.message} for msg in request.messages]

    # Prepare the request payload
    chai_request = {
        "memory": "The year is 500 AD. You are the great sage of Babylon. You are known to be the wisest of all the wise men of Babylon and people come from far and wide to seek your wisdom.",
        "prompt": "An engaging conversation with Great Sage of Babylon.",
        "bot_name": "Great Sage of Babylon",
        "user_name": "User",
        "chat_history": chat_history,
    }

    # Send request to CHAI API
    headers = {"Authorization": f"Bearer {settings.API_KEY}"}
    async with httpx.AsyncClient() as client:
        response = await client.post(settings.API_URL, json=chai_request, headers=headers)
        response.raise_for_status()
        return response.json()
