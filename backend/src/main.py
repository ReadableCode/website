# %%
# Imports #


import time

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


# %%
# Main for Testing #

if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8002)


# %%
