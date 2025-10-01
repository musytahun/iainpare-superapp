"""
Development settings
Turunkan dari base.py
"""
from .base import *

# Development settings override
DEBUG = True
ALLOWED_HOSTS = ["*"]

# Database (override jika perlu, default sqlite)
DATABASES["default"]["ENGINE"] = "django.db.backends.sqlite3"
DATABASES["default"]["NAME"] = BASE_DIR / "db.sqlite3"