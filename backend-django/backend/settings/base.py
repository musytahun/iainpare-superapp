"""
Base settings untuk semua environment
Gunakan .env untuk konfigurasi sensitif
"""
import environ
import os
from pathlib import Path
from corsheaders.defaults import default_headers
import dj_database_url
from dotenv import load_dotenv

load_dotenv()  # membaca file .env

# Root project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Inisialisasi environ
env = environ.Env(
    DEBUG=(bool, False)
)

# Baca file .env
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# SECURITY
SECRET_KEY = env("SECRET_KEY", default="unsafe-secret-key")
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

# CORS & CSRF
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

CORS_ALLOW_HEADERS = list(default_headers) + [
    "x-active-module",
    "X-Active-Role",
]

# Apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # third party
    "strawberry.django", # integrasi GraphQL Strawberry
    "corsheaders", # untuk atur izin CORS

    # apps custom
    "apps.core",
    "apps.accounts",
    "apps.references",
    "apps.people",
    "apps.lppm",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware", # middleware untuk tangani CORS
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware", # default CSRF protection
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "apps.core.middleware.AuthMiddleware",  # ⬅️ middleware untuk tangani autentikasi. URUTAN SANGAT PENTING
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database
DATABASES = {
    # "default": {
    #     "ENGINE": env("DB_ENGINE", default="django.db.backends.sqlite3"),
    #     "NAME": env("DB_NAME", default="db.sqlite3"),
    #     "USER": env("DB_USER", default=""),
    #     "PASSWORD": env("DB_PASSWORD", default=""),
    #     "HOST": env("DB_HOST", default=""),
    #     "PORT": env("DB_PORT", default=""),
    # }
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))
}

AUTH_USER_MODEL = "accounts.User"

# Password validators
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# I18N
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
