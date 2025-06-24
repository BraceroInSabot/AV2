from .settings import *
from decouple import config

SECRET_KEY = config("SECRET_KEY", default="", cast=str)
DEBUG = config("DEBUG", default=False, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost, *", cast=lambda v: [s.strip() for s in v.split(",")])
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

INSTALLED_APPS += [
    'corsheaders',
]

MIDDLEWARE += [
    'corsheaders.middleware.CorsMiddleware',
]