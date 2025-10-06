from typing import Optional
from .models import User, Role, Permission

# ==== USERS ====
def get_users():
    return User.objects.all()

def get_user_by_id(*, id: int) -> Optional[User]:
    return User.objects.filter(id=id).first()

def get_user_by_username(*, username: str) -> Optional[User]:
    return User.objects.filter(id=id).first()


# ==== ROLE & PERMISSION ====
def get_roles():
    return Role.objects.prefetch_related("permissions").all()

def get_permissions():
    return Permission.objects.all()

def get_role_by_id(*, id: int):
    return Role.objects.filter(pk=id).first()

def get_permission_by_id(*, id: int):
    return Permission.objects.filter(pk=id).first()