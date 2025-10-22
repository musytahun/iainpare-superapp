# apps/accounts/selectors/user_selector.py
from typing import Optional
from apps.accounts.models import User


def get_users():
    return User.objects.prefetch_related("roles__permissions").all()


def get_user_by_id(*, id: int) -> Optional[User]:
    return User.objects.filter(id=id).first()


def get_user_by_username(*, username: str) -> Optional[User]:
    return User.objects.filter(id=id).first()


def get_user_modules(user):
    if not user or not user.is_authenticated:
        print("user belum login atau AnonymousUser")
        return []
    
    # Ambil modul yang terkait dengan semua role user
    modules = user.get_accessible_modules().prefetch_related("roles")
    print("Modules untuk", user.username, ":", modules)
    return modules
