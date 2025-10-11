import strawberry
from typing import List
from strawberry import auto
from .models import User, Role, Permission

@strawberry.type
class AuthPayload:
    token: str
    username: str

@strawberry.django.type(Permission)
class PermissionType:
    id: auto
    name: auto
    code: auto

@strawberry.django.type(Role)
class RoleType:
    id: auto
    name: auto
    permissions: List[PermissionType]

@strawberry.django.type(User)
class UserType:
    id: auto
    username: auto
    email: auto
    full_name: auto
    roles: List["RoleType"]