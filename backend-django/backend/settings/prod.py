from .base import *

DEBUG = False
ALLOWED_HOSTS = ["*"]

# Pastikan SECRET_KEY diisi via .env
SECRET_KEY = env("SECRET_KEY")

# Hosts production
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])

# Contoh tambahan security di production
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True