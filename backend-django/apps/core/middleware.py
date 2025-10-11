# apps/core/middleware.py
import jwt
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from apps.accounts.models import User


class AuthMiddleware(MiddlewareMixin):
    """
    🔐 Middleware untuk menambahkan user ke request (context).
    Membaca token JWT dari header Authorization: Bearer <token>
    """

    def process_request(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            request.user = None
            return

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            user = User.objects.filter(id=user_id).first()
            request.user = user
        except jwt.ExpiredSignatureError:
            request.user = None
        except jwt.InvalidTokenError:
            request.user = None


# =====================================================
# 🎯 RBAC Middleware Helper untuk Strawberry
# =====================================================

def get_user_from_context(info):
    """Ambil user aktif dari Strawberry GraphQL context."""
    request = info.context["request"]
    return getattr(request, "user", None)


def require_permission(info, permission_code: str):
    """
    Dipanggil dari resolver:
    require_permission(info, "user.view")
    """
    user = get_user_from_context(info)
    if not user or not user.is_authenticated:
        raise Exception("User belum login.")
    if not user.has_permission(permission_code):
        raise Exception(f"Akses ditolak: Anda tidak punya izin '{permission_code}'")
    return True


def require_role(info, roles: list[str]):
    """
    Contoh: require_role(info, ["admin", "staff"])
    """
    user = get_user_from_context(info)
    if not user or not user.is_authenticated:
        raise Exception("User belum login.")
    if user.is_superuser:
        return True
    user_roles = [r.name for r in user.roles.all()]
    if not any(role in user_roles for role in roles):
        raise Exception("Anda tidak memiliki peran yang dibutuhkan.")
    return True
