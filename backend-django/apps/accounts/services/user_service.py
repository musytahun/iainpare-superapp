# apps/accounts/services/user_service.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from apps.accounts.models import User, Role, Permission, Module
from apps.accounts.types import AuthPayload, UserType


def create_user(*, username: str, password: str, email: str = "", full_name: str = "", avatar: str = "", role_ids: Optional[List[int]] = None) -> User:
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name,
        avatar=avatar,
    )
    if role_ids:
        user.roles.set(Role.objects.filter(id__in=role_ids))
    return user


def update_user(
    *,
    id: int,
    username: Optional[str] = None,
    password: Optional[str] = None,
    email: Optional[str] = None,
    full_name: Optional[str] = None,
    avatar: Optional[str] = None,
    role_ids: Optional[list[int]] = None,  # ✅ ubah ini
) -> UserType:
    user = User.objects.get(pk=id)
    if not user:
        raise Exception("User not found")

    if username:
        user.username = username
    if email:
        user.email = email
    if full_name:
        user.full_name = full_name
    if avatar:
        user.avatar = avatar
    if password:
        user.set_password(password)
    user.save()

    if role_ids is not None:
        user.roles.set(Role.objects.filter(id__in=role_ids))  # ✅ set role banyak

    return user


def delete_user(*, id: int) -> bool:
    user = User.objects.filter(id=id).first()
    if not user:
        raise Exception("User not found")

    user.delete()
    return True


# ==== USER ROLE ====


def update_user_role(*, id: int, role_id: int) -> User:
    """
    Update role user berdasarkan ID user dan ID role
    """
    try:
        user = User.objects.get(id=id)
        role = Role.objects.get(id=role_id)
        user.roles.set([role])  # kalau mau ganti semua role jadi satu ini
        # user.roles.add(role)   # kalau mau menambahkan tanpa menghapus role lama
        user.save()
        return user
    except User.DoesNotExist:
        raise Exception("User tidak ditemukan")
    except Role.DoesNotExist:
        raise Exception("Role tidak ditemukan")