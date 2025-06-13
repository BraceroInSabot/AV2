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