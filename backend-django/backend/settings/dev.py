"""
Development settings
Turunkan dari base.py
"""
from .base import *

# Development settings override
DEBUG = True
ALLOWED_HOSTS = ["*"]

CORS_ALLOW_CREDENTIALS = True  # ⬅️ wajib untuk cookie/auth
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

# Database (override jika perlu, default sqlite)
# DATABASES["default"]["ENGINE"] = "django.db.backends.sqlite3"
# DATABASES["default"]["NAME"] = BASE_DIR / "db.sqlite3"