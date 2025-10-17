# apps/accounts/services.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from .models import User, Role, Permission, Module
from .types import AuthPayload, UserType


# ==== AUTH ====

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
        return AuthPayload(access_token=access_token, refresh_token=refresh_token, username=user.username) # AuthPayload = tipe yang dikembalikan ke frontend.


def refresh_access_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise Exception("Token tidak valid")

        user_id = payload.get("user_id")
        from .models import User
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




# ==== ROLE, PERMISSION, & MODULE ====

def create_role(*, name: str, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.create(name=name)
        if permission_ids:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        if module_ids:
            role.modules.set(Module.objects.filter(id__in=module_ids))
        return role

def update_role(*, id: int, name: Optional[str] = None, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.get(id=id)
        if name:
            role.name = name
        if permission_ids is not None:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        if module_ids is not None:
            role.modules.set(Module.objects.filter(id__in=module_ids))
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




def create_module(*, name: str, code: str, icon: str, url: str, role_ids: Optional[List[int]] = None) -> Module:
    module = Module.objects.create(
        name=name,
        code=code,
        icon=icon,
        url=url,
    )
    if role_ids:
        module.roles.set(Role.objects.filter(id__in=role_ids))
    return module

def update_module(*, id: int, name: Optional[str] = None, code: Optional[str] = None, icon: Optional[str] = None, url: Optional[str] = None, role_ids: Optional[List[int]] = None) -> Module:
    try:
        module = Module.objects.get(id=id)
        module.name = name
        module.code = code
        module.icon = icon
        module.url = url
        module.save()

        if role_ids is not None:
            module.roles.set(Role.objects.filter(id__in=role_ids))  # ⬅️ penting!

        return module
    except Module.DoesNotExist:
        return None

def delete_module(*, id: int) -> bool:
    Module.objects.filter(id=id).delete()
    return True

def assign_role_to_module(role: Role, module: Module):
    role.modules.add(module)
    return role

def remove_role_from_module(role: Role, module: Module):
    role.modules.remove(module)
    return role