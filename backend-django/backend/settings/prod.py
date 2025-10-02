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
DATABASES["default"]["NAME"] = env("DB_NAME", default="db.sqlite3")
DATABASES["default"]["USER"] = env("DB_USER", default="")
DATABASES["default"]["PASSWORD"] = env("DB_PASSWORD", default="")
DATABASES["default"]["HOST"] = env("DB_HOST", default="")
DATABASES["default"]["PORT"] = env("DB_PORT", default="")

# Contoh tambahan security di production
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True