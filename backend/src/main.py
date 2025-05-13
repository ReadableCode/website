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
        Greetings! I am a passionate developer dedicated to automation and modular solutions to issues I find interesting. These are my personal projects and this account only holds my non-professional codebases. Please comment, fork and contribute as you see fit. I am always looking for ways to improve my code and learn new things.

        🛠 Projects

        • Python, Rust, and Go based data tool packs to allow for data science and analytics without all the setup: I'm working on Python, Rust and Go based data tool packs that enable data science and analytics professionals to access different platforms (e.g. Snowflake, RDS, AWS S3, Vault, Databricks) easily without all the setup. This initiative seeks to empower users with efficient and high-performance tools for data processing, analysis, and visualization.

        → Python: https://github.com/ReadableCode/Data_Tool_Pack_Py
        
        → Go:     https://github.com/ReadableCode/Data_Tool_Pack_GO
        
        → Rust:   https://github.com/ReadableCode/Data_Tool_Pack_RS

        • Terminal Based Kanban Board Using Linux Commands for Manipulation: I'm developing a terminal-based Kanban board that leverages Linux-like commands for manipulation. This project aims to streamline task management and enhance productivity by providing a seamless interface for organizing and tracking tasks.
        - Stack:
            - Frontend: Python for the TUI
            - Storage: Self hosted S3-compatible storage (MinIO)
            - Hosting: Built for local running in Windows or Linux

        → https://github.com/ReadableCode/Terminal_To_Do
        
        • AI-Powered eBook Organizer (Offline-First): A smart eBook renaming and organization tool that processes messy ebook folders and uses a local large language model (no internet or accounts required) to identify metadata like author, series, series order, and title. It restructures your library into a clean, nested format by author and series. Built for full local use, but easily swappable to OpenAI or other APIs if desired.
        - Stack:
            - Frontend: Python for the TUI
            - Storage: Self hosted PostgreSQL Database
            - Hosting: PostgresQL database running in Docker and exposed through TailScale

        → https://github.com/ReadableCode/Book-Bot

        • Dotfile Sync Application: My work involves creating a dotfile synchronization application. This tool empowers me to apply settings to non-configurable applications on mobile devices through AHK, Tasker, and iOS actions. This will also pull configurations over SSH or SCP from devices that generally dont support symlinking into a git repo like my router and unraid server. The goal is to achieve a consistent experience across platforms.

        → https://github.com/ReadableCode/dotfiles

        • A Girl's Guide to Georgetown: This project provides high school students in Georgetown, Texas, with a structured backend while allowing them full creative control over the frontend. The backend, built in Go with Fiber, dynamically serves pages without requiring container rebuilds. It is deployed via Docker Compose on a Linux server, reverse-proxied through SWAG, and managed with Cloudflare and DuckDNS. Students handle the HTML, CSS, and JavaScript, ensuring they can iterate freely without backend constraints. This setup fosters student-led development while maintaining a stable and scalable foundation.
        - Stack:
            - Frontend: HTML, CSS, JavaScript
            - Backend: Go with Fiber
            - Hosting: Self-hosted Kubernetes cluster (K3S)
            - Ingress: NGINX reverse proxy with SWAG in Docker-Compose

        → https://github.com/ReadableCode/a_girls_guide_to_georgetown

        • Sync Application for Removable Storage: I'm developing a synchronization application tailored for removable storage. This application ensures seamless syncing of sensitive directories, such as Git repositories, while handling line-ending conversions, local discovery, and sync change management. Additionally, I'm incorporating the option to symlink externally post-sync.
        - Stack:
            - Frontend: Python for the TUI
            - Storage: Designed for local storage
            - Hosting: Built for local running in Windows or Linux for internal or attached storage (could include network maps)

        → https://github.com/ReadableCode/Sync_Plex

        • A 2D game written in C# using the Unity engine: I'm developing a 2D game with my wonderful wife using C# and the Unity engine. This project aims to showcase my creativity and programming skills while exploring the intricacies of game development. I'm excited to bring this vision to life and create an engaging gaming experience. This one is not open source yet.

        🤝 Collaboration
        ----------------

        I'm enthusiastic about collaborating with fellow developers and enthusiasts on these projects. Whether you're interested in contributing, have questions, or would like to explore potential synergies, please don't hesitate to reach out. Let's join forces to drive innovation and create impactful solutions together.

        Feel free to connect with me if you're intrigued by any of these initiatives. Your insights and contributions are highly valued!

        You can also curl this endpoint in bash like:
        curl 'https://api.tinkernet.me/my-info/'
    """  # noqa: E501


# %%
# Main for Testing #

if __name__ == "__main__":
    # Run the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8002)


# %%
