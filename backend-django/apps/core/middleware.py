# apps/core/middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import jwt
from apps.accounts.models import User, Module, Role


class AuthMiddleware(MiddlewareMixin):
    """
    🔐 Middleware untuk menambahkan user ke request (context).
    Membaca token JWT dari header Authorization: Bearer <token>
    """

    def process_request(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header or not auth_header.startswith("Bearer "):
            request.user = None
            request.active_module = None
            request.active_role = None
            return

        access_token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            request.user = User.objects.get(id=user_id)
        except Exception as e:
            print("JWT Error:", e)
            request.user = None

        print("Authorization:", auth_header)
        print("Decoded user:", request.user)

        # Ambil konteks aktif dari header tambahan
        request.active_module = request.META.get("HTTP_X_MODULE")
        request.active_role = request.META.get("HTTP_X_ROLE")

        if request.active_module:
            try:
                request.active_module = Module.objects.get(code=request.active_module)
            except Module.DoesNotExist:
                request.active_module = None

        if request.active_role:
            try:
                request.active_role = Role.objects.get(name=request.active_role)
            except Role.DoesNotExist:
                request.active_role = None


