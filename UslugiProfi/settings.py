"""
Django settings for tutorial project.

Generated by 'django-admin startproject' using Django 3.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from datetime import timedelta
from dotenv import load_dotenv


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv(os.path.join(BASE_DIR, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG") if "DEBUG" in os.environ else True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # LIBS
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    # CUSTOM_APPS
    "user",
    "category",
    "subcategory",
    "announcement",
    "authentication",
    "dimension",
    "price_currency",
]

MIDDLEWARE = [
    # CORS
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    # COMMON
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "UslugiProfi.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "UslugiProfi.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME") if "DB_NAME" in os.environ else "",
        "USER": os.getenv("DB_USERNAME") if "DB_USERNAME" in os.environ else "",
        "PASSWORD": os.getenv("DB_PASSWORD") if "DB_PASSWORD" in os.environ else "",
        "HOST": os.getenv("DB_HOST") if "DB_HOST" in os.environ else "localhost",
        "PORT": os.getenv("DB_PORT") if "DB_PORT" in os.environ else 5432,
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_USER_MODEL = "user.UserModel"
AUTHENTICATION_BACKENDS = ["authentication.backends.EmailBackend"]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "SIGNING_KEY": os.getenv("JWT_SECRET_KEY") if "JWT_SECRET_KEY" in os.environ else "JWT_SECRET_KEY",
    "AUTH_HEADER_TYPES": (
        os.getenv("JWT_AUTH_HEADER_PREFIX") if "JWT_AUTH_HEADER_PREFIX" in os.environ else "Bearer",
    ),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-en"

TIME_ZONE = "Europe/Moscow"

USE_I18N = True
USE_L10N = True
USE_TZ = True

APPEND_SLASH = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)

# Base url to serve media files
MEDIA_URL = "/media/"

# Path where media is stored
MEDIA_ROOT = os.path.join(BASE_DIR, "media/")

# Email settings

EMAIL_HOST = os.getenv("EMAIL_HOST") if "EMAIL_HOST" in os.environ else "localhost"
EMAIL_PORT = os.getenv("EMAIL_PORT") if "EMAIL_PORT" in os.environ else 25
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD") if "EMAIL_HOST_PASSWORD" in os.environ else ""
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER") if "EMAIL_HOST_USER" in os.environ else ""
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS") if "EMAIL_USE_TLS" in os.environ else False
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL") if "DEFAULT_FROM_EMAIL" in os.environ else ""

# CORS Settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = False

# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',
#     'http://127.0.0.1:3000',
# ]
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     'http://localhost:3000',
# ]
