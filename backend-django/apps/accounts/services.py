from .models import User
from typing import Optional

def create_user(*, username: str, password: str, email: str = "", full_name: str = "") -> User:
    return User.objects.create_user(
        username=username,
        password=password,
        email=email,
        full_name=full_name,
    )

def update_user(
    *,
    id: int,
    username: Optional[str] = None,
    password: Optional[str] = None,
    email: Optional[str] = None,
    full_name: Optional[str] = None
) -> User:

    try:
        user = User.objects.get(id=id)

        if username is not None:
            user.username = username
        if email is not None:
            user.email = email
        if full_name is not None:
            user.full_name = full_name
        if password is not None:
            user.set_password(password)

        user.save()
        return user
    except User.DoesNotExist:
        raise Exception("User not found")

def delete_user(*, id: int) -> bool:
    try:
        user = User.objects.get(id=id)
        user.delete()
        return True
    except User.DoesNotExist:
        raise Exception("User not found")
    