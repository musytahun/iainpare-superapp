from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from .models import User, Role, Permission
from .types import AuthPayload


# ==== AUTH ====
def authenticate_user(username: str, password: str):
        user = authenticate(username=username, password=password) # authenticate() = fungsi bawaan Django untuk verifikasi username & password.
        if user is None:
            raise Exception("Username atau password salah")

        permissions = []
        if user.role:
            permissions = list(user.role.permissions.values_list("code", flat=True))

        payload = {
            "user_id": user.id,
            "username": user.username,
            "role": user.role.name if user.role else None,
            "permissions": permissions,  # kirim semua permission user
            "exp": datetime.utcnow() + timedelta(hours=1), # exp = waktu kadaluarsa token (di sini: 1 jam)
            "iat": datetime.utcnow(),
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256") # jwt.encode() = membuat token JWT dengan SECRET_KEY dari Django.
        return AuthPayload(token=token, username=user.username) # AuthPayload = tipe yang dikembalikan ke frontend.


# ==== USERS ====
def create_user(*, username: str, password: str, email: str = "", full_name: str = "", role_id: int) -> User:
    return User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name,
        role_id=role_id
    )

def update_user(
    *,
    id: int,
    username: Optional[str] = None,
    password: Optional[str] = None,
    email: Optional[str] = None,
    full_name: Optional[str] = None,
    role_id: Optional[int] = None
) -> User:
    user = User.objects.filter(id=id).first()
    if not user:
        raise Exception("User not found")

    if username:
        user.username = username
    if email:
        user.email = email
    if full_name:
        user.full_name = full_name
    if password:
        user.set_password(password)

    if role_id is not None:
        try:
            role = Role.objects.get(id=role_id)
            user.role = role
        except Role.DoesNotExist:
            raise Exception("Role not found")

    user.save()
    return user

def delete_user(*, id: int) -> bool:
    user = User.objects.filter(id=id).first()
    if not user:
        raise Exception("User not found")

    user.delete()
    return True

def update_user_role(*, id: int, role_id: int) -> User:
    """
    Update role user berdasarkan ID user dan ID role
    """
    try:
        user = User.objects.get(id=id)
        role = Role.objects.get(id=role_id)
        user.role = role
        user.save()
        return user
    except User.DoesNotExist:
        raise Exception("User tidak ditemukan")
    except Role.DoesNotExist:
        raise Exception("Role tidak ditemukan")


# ==== ROLE & PERMISSION ====
def create_role(*, name: str, permission_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.create(name=name)
        if permission_ids:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        return role

def update_role(*, id: int, name: Optional[str] = None, permission_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.get(id=id)
        if name:
            role.name = name
        if permission_ids is not None:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        role.save()
        return role

def delete_role(*, id: int) -> bool:
    Role.objects.filter(id=id).delete()
    return True

def create_permission(*, name: str, code: str) -> Permission:
    return Permission.objects.create(name=name, code=code)

def update_permission(*, id: int, name: Optional[str] = None, code: Optional[str] = None) -> Permission:
    with transaction.atomic():
        permission = Permission.objects.get(id=id)
        if name:
            permission.name = name
        if code:
            permission.code = code
        permission.save()
        return permission

def delete_permission(*, id: int) -> bool:
    Permission.objects.filter(id=id).delete()
    return True