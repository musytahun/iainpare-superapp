from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from .models import User, Role, Permission
from .types import AuthPayload, UserType


# ==== AUTH ====

def generate_tokens(user):
    """Generate access & refresh token"""
    permissions = []
    if user.roles.exists():
        permissions = list(
            Permission.objects.filter(roles__in=user.roles.all()).values_list("code", flat=True)
        ) 

    access_payload = {
        "user_id": user.id,
        "username": user.username,
        "roles": list(user.roles.values_list("name", flat=True)) if user.roles.exists() else [],
        "permissions": permissions, # kirim semua permission user
        "exp": datetime.utcnow() + timedelta(hours=1), # exp = waktu kadaluarsa token (seconds, minutes=30, hours=12, days=7, weeks=4, months=6, years=1)
        "iat": datetime.utcnow(),
        "type": "access",
    }

    refresh_payload = {
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(days=1),
        "iat": datetime.utcnow(),
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
        return AuthPayload(access_token=access_token, refresh_token=refresh_token, username=user.username) # AuthPayload = tipe yang dikembalikan ke frontend.


def refresh_access_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise Exception("Token tidak valid")

        user_id = payload.get("user_id")
        from .models import User
        user = User.objects.get(id=user_id)

        access_token, new_refresh_token = generate_tokens(user)
        return AuthPayload(
            access_token=access_token,
            username=user.username,
            refresh_token=new_refresh_token
)

    except jwt.ExpiredSignatureError:
        raise Exception("Signature has expired")
    except jwt.InvalidTokenError:
        raise Exception("Refresh token tidak valid")



# ==== USERS ====


def create_user(*, username: str, password: str, email: str = "", full_name: str = "", role_ids: Optional[List[int]] = None) -> User:
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name
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