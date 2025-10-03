from .models import User


def create_user(*, username: str, password: str, email: str = "", full_name: str = "") -> User:
    """
    Service untuk membuat user baru.
    Semua logika bisnis pembuatan user taruh di sini.
    """
    return User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name,
    )
