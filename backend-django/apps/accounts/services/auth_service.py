# apps/accounts/services/auth_service.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from apps.accounts.models import User, Role, Permission, Module
from apps.accounts.types import AuthPayload, UserType


def generate_tokens(user):
    now = datetime.utcnow()
    """Generate access & refresh token"""
    permissions = []
    if user.roles.exists():
        permissions = list(
            Permission.objects.filter(roles__in=user.roles.all()).values_list("code", flat=True)
        )

    modules = []
    if user.roles.exists():
        modules = list(
            Module.objects.filter(roles__in=user.roles.all()).values_list("code", flat=True)
        )

    access_payload = {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "avatar": user.avatar,
        "roles": list(user.roles.values_list("name", flat=True)) if user.roles.exists() else [],
        "permissions": permissions, # kirim semua permission user
        "modules": modules,
        "exp": now + timedelta(hours=1), # exp = waktu kadaluarsa token (seconds, minutes=30, hours=12, days=7, weeks=4, months=6, years=1)
        "iat": now,
        "type": "access",
    }

    refresh_payload = {
        "user_id": user.id,
        "exp": now + timedelta(days=1),
        "iat": now,
        "login_time": now.isoformat(),
        "type": "refresh",
    }

    access_token = jwt.encode(access_payload, settings.SECRET_KEY, algorithm="HS256") # jwt.encode() = membuat token JWT dengan SECRET_KEY dari Django.
    refresh_token = jwt.encode(refresh_payload, settings.SECRET_KEY, algorithm="HS256")

    return access_token, refresh_token


def authenticate_user(username: str, password: str):
        user = authenticate(username=username, password=password) # authenticate() = fungsi bawaan Django untuk verifikasi username & password.
        if user is None:
            raise Exception("Username atau password salah")

        access_token, refresh_token = generate_tokens(user)
        return AuthPayload(access_token=access_token, refresh_token=refresh_token, username=user.username, email=user.email, full_name=user.full_name, avatar=user.avatar) # AuthPayload = tipe yang dikembalikan ke frontend.


def refresh_access_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise Exception("Token tidak valid")

        user_id = payload.get("user_id")
        user = User.objects.get(id=user_id)

        # access_token, new_refresh_token = generate_tokens(user) # untuk Rotating Refresh Token hasilnya sliding session
        access_token = generate_tokens(user) # buat hanya access_token baru, tanpa membuat refresh_token baru
        return AuthPayload(
            access_token=access_token,
            username=user.username,
            refresh_token=refresh_token  # tetap kirim token lama
            # refresh_token=new_refresh_token # untuk Rotating Refresh Token hasilnya sliding session
        )

    except jwt.ExpiredSignatureError:
        raise Exception("Signature has expired")
    except jwt.InvalidTokenError:
        raise Exception("Refresh token tidak valid")