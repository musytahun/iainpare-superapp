from .models import User
from typing import Optional
from django.contrib.auth import authenticate
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from .types import AuthPayload

def authenticate_user(username: str, password: str):
        user = authenticate(username=username, password=password) # authenticate() = fungsi bawaan Django untuk verifikasi username & password.
        if user is None:
            raise Exception("Username atau password salah")

        payload = {
            "user_id": user.id,
            "username": user.username,
            "exp": datetime.utcnow() + timedelta(hours=1), # exp = waktu kadaluarsa token (di sini: 1 jam)
            "iat": datetime.utcnow(),
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256") # jwt.encode() = membuat token JWT dengan SECRET_KEY dari Django.
        return AuthPayload(token=token, username=user.username) # AuthPayload = tipe yang dikembalikan ke frontend.

def create_user(*, username: str, password: str, email: str = "", full_name: str = "") -> User:
    return User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name,
    )

def update_user(
    *,
    id: int,
    username: Optional[str] = None,
    password: Optional[str] = None,
    email: Optional[str] = None,
    full_name: Optional[str] = None
) -> User:

    try:
        user = User.objects.get(id=id)

        if username is not None:
            user.username = username
        if email is not None:
            user.email = email
        if full_name is not None:
            user.full_name = full_name
        if password is not None:
            user.set_password(password)

        user.save()
        return user
    except User.DoesNotExist:
        raise Exception("User not found")

def delete_user(*, id: int) -> bool:
    try:
        user = User.objects.get(id=id)
        user.delete()
        return True
    except User.DoesNotExist:
        raise Exception("User not found")
