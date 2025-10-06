# apps/accounts/permissions.py
import jwt
from django.conf import settings
from strawberry.types import Info

def require_permission(info: Info, required_code: str):
    request = info.context.request
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise Exception("Token tidak ditemukan")

    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        permissions = payload.get("permissions", [])
        if required_code not in permissions:
            raise Exception("Akses ditolak")
    except jwt.ExpiredSignatureError:
        raise Exception("Token kedaluwarsa")
    except jwt.InvalidTokenError:
        raise Exception("Token tidak valid")
