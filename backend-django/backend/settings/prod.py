"""
Production settings
Turunkan dari base.py
"""
from .base import *

DEBUG = False

# Pastikan SECRET_KEY diisi via .env
SECRET_KEY = env("SECRET_KEY")

# Hosts production
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])

# Database (override jika pakai production db)
DATABASES["default"]["ENGINE"] = env("DB_ENGINE", default="django.db.backends.sqlite3")
DATABASES["default"]["NAME"] = env("DB_NAME", default=BASE_DIR / "db.sqlite3")
DATABASES["default"]["USER"] = env("DB_USER", default="")
DATABASES["default"]["PASSWORD"] = env("DB_PASSWORD", default="")
DATABASES["default"]["HOST"] = env("DB_HOST", default="")
DATABASES["default"]["PORT"] = env("DB_PORT", default="")