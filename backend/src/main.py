# %%
# Imports #

import io
import os

import pandas as pd
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.responses import PlainTextResponse

# %%
# Variables #

app = FastAPI()


# %%
# Functions #


@app.get("/status", response_class=PlainTextResponse)
def get_status():
    return "✅ App is running.\n📦 Version: 1.2.3\n🕒 Uptime: 12h 4m\n"


@app.get("/")
def root():
    """
    Simple health check endpoint.
    """
    return {"status": "pong"}


@app.get("/ping/")
def ping():
    """
    Simple health check endpoint.
    """
    return {"status": "pong"}


# %%
