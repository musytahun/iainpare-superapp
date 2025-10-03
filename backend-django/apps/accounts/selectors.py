from typing import Optional
from .models import User


def get_users():
    try:
        return User.objects.all()
    except User.DoesNotExist:
        return None


def get_user_by_id(*, id: int) -> Optional[User]:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        return None


def get_user_by_username(*, username: str) -> Optional[User]:
    try:
        return User.objects.get(username=username)
    except User.DoesNotExist:
        return None
