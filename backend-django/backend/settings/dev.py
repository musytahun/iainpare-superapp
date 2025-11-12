from .base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]

CORS_ALLOW_CREDENTIALS = True  # ⬅️ wajib untuk cookie/auth
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=["http://localhost:3000"])
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=["http://localhost:3000"])

DATABASES["default"]["ENGINE"] = env("DB_ENGINE", default="django.db.backends.sqlite3")
DATABASES["default"]["NAME"] = env("DB_NAME", default="db.sqlite3")
DATABASES["default"]["USER"] = env("DB_USER", default="")
DATABASES["default"]["PASSWORD"] = env("DB_PASSWORD", default="")
DATABASES["default"]["HOST"] = env("DB_HOST", default="")
DATABASES["default"]["PORT"] = env("DB_PORT", default="")