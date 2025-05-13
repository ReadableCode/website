# %%
# Imports #


import time

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

# %%
# Variables #

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app_start_time = time.time()

# %%
# Functions #


@app.get("/status", response_class=PlainTextResponse)
def get_status():
    return f"✅ App is running.\n🕒 Uptime: {time.time() - app_start_time}"


@app.get("/", response_class=PlainTextResponse)
def root():
    return "pong"


@app.get("/ping/")
def ping():
    """
    Simple health check endpoint.
    """
    return {"status": "pong"}


@app.get("/my-info/", response_class=PlainTextResponse)
def my_info():
    return """
        ReadableCode - Personal Projects

        🧠 About Me
        -----------
        I'm a passionate developer focused on automation and documentation-as-code solutions.
        This API lists my non-professional, open-source projects.

        🛠 Projects
        ----------
        • Data Tool Packs (Python, Go, Rust)
        → Python: https://github.com/ReadableCode/Data_Tool_Pack_Py
        → Go:     https://github.com/ReadableCode/Data_Tool_Pack_GO
        → Rust:   https://github.com/ReadableCode/Data_Tool_Pack_RS

        • Terminal-Based Kanban Board
        → https://github.com/ReadableCode/Terminal_To_Do

        • AI-Powered eBook Organizer (Offline-First)
        → https://github.com/ReadableCode/Book-Bot

        • Dotfile Sync Tool
        → https://github.com/ReadableCode/dotfiles

        • A Girl's Guide to Georgetown (Student-Led Frontend)
        → https://github.com/ReadableCode/a_girls_guide_to_georgetown

        • Sync App for Removable Storage
        → https://github.com/ReadableCode/Sync_Plex

        • 2D Game in Unity (Private)
        → Not open source yet

        🤝 Collaboration
        ----------------
        Always open to ideas or contributions. Fork, comment, or reach out.
        
        You can also curl this endpoint in bash like:
        curl 'https://api.tinkernet.me/my-info/'
    """


# %%
# Main for Testing #

if __name__ == "__main__":
    # Run the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8002)


# %%
