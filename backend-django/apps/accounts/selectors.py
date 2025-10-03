from typing import Optional
from .models import User


def get_user(*, user_id: int) -> Optional[User]:
    """
    Selector untuk mengambil user berdasarkan ID.
    """
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None


def get_user_by_username(*, username: str) -> Optional[User]:
    """
    Selector untuk mengambil user berdasarkan username.
    """
    try:
        return User.objects.get(username=username)
    except User.DoesNotExist:
        return None
