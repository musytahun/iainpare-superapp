# apps/accounts/services/role_service.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from apps.accounts.models import User, Role, Permission, Module
from apps.accounts.types import AuthPayload, UserType

def create_role(*, name: str, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.create(name=name)
        if permission_ids:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        if module_ids:
            role.modules.set(Module.objects.filter(id__in=module_ids))
        return role


def update_role(*, id: int, name: Optional[str] = None, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> Role:
    with transaction.atomic():
        role = Role.objects.get(id=id)
        if name:
            role.name = name
        if permission_ids is not None:
            role.permissions.set(Permission.objects.filter(id__in=permission_ids))
        if module_ids is not None:
            role.modules.set(Module.objects.filter(id__in=module_ids))
        role.save()
        return role


def delete_role(*, id: int) -> bool:
    Role.objects.filter(id=id).delete()
    return True