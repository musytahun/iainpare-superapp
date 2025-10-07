# apps/accounts/permissions.py
import jwt
from django.conf import settings
from strawberry.types import Info
from .models import User


def get_user_from_token(info: Info):
    """
    Mengambil user dari token JWT yang dikirim via header Authorization: Bearer <token>
    """
    request = info.context.request
    auth_header = request.headers.get("Authorization") # pengecekan token lewat ini. frontend kirim header Authorization: Bearer <token> 

    if not auth_header or not auth_header.startswith("Bearer "):
        raise Exception("Token tidak ditemukan")

    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        user = User.objects.select_related("role").prefetch_related("role__permissions").filter(id=user_id).first()
        if not user:
            raise Exception("User tidak ditemukan")
        return user

    except jwt.ExpiredSignatureError:
        raise Exception("Token kedaluwarsa")
    except jwt.InvalidTokenError:
        raise Exception("Token tidak valid")


def require_permission(info: Info, required_code: str):
    """
    Middleware permission berbasis database.
    Mengecek apakah user punya permission sesuai kode yang dibutuhkan.
    """
    user = get_user_from_token(info)
    user_permissions = [p.code for p in user.role.permissions.all()] if user.role else []
    
    if required_code not in user_permissions:
        raise Exception("Akses ditolak: tidak punya izin")
    return True


def require_role(info: Info, allowed_roles: list[str]):
    """
    Middleware role berbasis database.
    Mengecek apakah role user termasuk dalam allowed_roles.
    """
    user = get_user_from_token(info)
    if not user.role or user.role.name.lower() not in [r.lower() for r in allowed_roles]:
        raise Exception(f"Akses ditolak: hanya untuk role {allowed_roles}")
    return True
