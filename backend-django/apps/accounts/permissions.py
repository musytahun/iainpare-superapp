# apps/accounts/permissions.py
import functools
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from strawberry.types import Info
from .models import User, Permission


def get_user_from_token(info: Info):
    """
    Mengambil user dari token JWT yang dikirim via header Authorization: Bearer <token>
    """
    request = getattr(info.context, "request", None) or info.context.get("request")
    if not request:
        raise Exception("Request context tidak ditemukan")

    auth_header = request.headers.get("Authorization") or request.META.get("HTTP_AUTHORIZATION")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise Exception("Token tidak ditemukan")

    access_token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        user = (
            User.objects.prefetch_related("roles__permissions")
            .filter(id=user_id)
            .first()
        )
        if not user:
            raise Exception("User tidak ditemukan")
        return user

    except jwt.ExpiredSignatureError:
        raise Exception("Signature has expired")
    except jwt.InvalidTokenError:
        raise Exception("Token tidak valid")


def require_permission(info: Info, required_code: str):
    user = get_user_from_token(info)
    if user.is_superuser:
        return True

    # Ambil semua kode permission dari seluruh role user
    user_permissions = Permission.objects.filter(roles__in=user.roles.all()).values_list("code", flat=True)
    if required_code not in user_permissions:
        raise Exception("Akses ditolak: tidak punya izin")
    return True


def require_role(info: Info, allowed_roles: list[str]):
    """
    Middleware role berbasis database.
    Mengecek apakah role user termasuk dalam allowed_roles.
    """
    user = get_user_from_token(info)
    if user.is_superuser:
        return True

    user_role_names = [r.name.lower() for r in user.roles.all()]
    allowed_roles = [r.lower() for r in allowed_roles]

    if not any(role in allowed_roles for role in user_role_names):
        raise Exception(f"Akses ditolak: hanya untuk role {allowed_roles}")
    return True

# ✅ Tambahkan versi decorator agar bisa dipakai sebagai @require_permission("user.update")
def permission_required(permission_code: str):
    def decorator(resolver_func):
        @functools.wraps(resolver_func)
        def wrapper(*resolver_args, info: Info, **resolver_kwargs):
            require_permission(info, permission_code)
            return resolver_func(*resolver_args, info=info, **resolver_kwargs)
        return wrapper
    return decorator


def role_required(allowed_roles: list[str]):
    def decorator(resolver_func):
        @functools.wraps(resolver_func)
        def wrapper(*resolver_args, info: Info, **resolver_kwargs):
            require_role(info, allowed_roles)
            return resolver_func(*resolver_args, info=info, **resolver_kwargs)
        return wrapper
    return decorator