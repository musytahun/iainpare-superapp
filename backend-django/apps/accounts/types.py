import strawberry
from typing import List, Optional
from strawberry import auto
from .models import User, Role, Permission, Module

@strawberry.type
class AuthPayload:
    access_token: str
    username: str
    refresh_token: str

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
    modules: List["ModuleType"]  # gunakan string agar bisa referensi silang

@strawberry.django.type(Module)
class ModuleType:
    id: strawberry.ID
    name: str
    code: str
    icon: Optional[str]
    url: Optional[str]
    roles: List[RoleType]  # tambahkan ini agar GraphQL menampilkan roles

@strawberry.django.type(User)
class UserType:
    id: auto
    username: auto
    email: auto
    full_name: auto
    roles: List["RoleType"]