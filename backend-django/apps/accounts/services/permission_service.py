# apps/accounts/services/permission_service.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from apps.accounts.models import User, Role, Permission, Module
from apps.accounts.types import AuthPayload, UserType


def create_permission(*, name: str, code: str) -> Permission:
    return Permission.objects.create(name=name, code=code)


def update_permission(*, id: int, name: Optional[str] = None, code: Optional[str] = None) -> Permission:
    with transaction.atomic():
        permission = Permission.objects.get(id=id)
        if name:
            permission.name = name
        if code:
            permission.code = code
        permission.save()
        return permission


def delete_permission(*, id: int) -> bool:
    Permission.objects.filter(id=id).delete()
    return True