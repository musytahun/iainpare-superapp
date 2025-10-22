# apps/accounts/services/module_service.py
from datetime import datetime, timedelta
from typing import List, Optional
import jwt
from jwt import ExpiredSignatureError
from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from apps.accounts.models import User, Role, Permission, Module
from apps.accounts.types import AuthPayload, UserType


def create_module(*, name: str, code: str, icon: str, url: str, role_ids: Optional[List[int]] = None) -> Module:
    module = Module.objects.create(
        name=name,
        code=code,
        icon=icon,
        url=url,
    )
    if role_ids:
        module.roles.set(Role.objects.filter(id__in=role_ids))
    return module


def update_module(*, id: int, name: Optional[str] = None, code: Optional[str] = None, icon: Optional[str] = None, url: Optional[str] = None, role_ids: Optional[List[int]] = None) -> Module:
    try:
        module = Module.objects.get(id=id)
        module.name = name
        module.code = code
        module.icon = icon
        module.url = url
        module.save()

        if role_ids is not None:
            module.roles.set(Role.objects.filter(id__in=role_ids))  # ⬅️ penting!

        return module
    except Module.DoesNotExist:
        return None


def delete_module(*, id: int) -> bool:
    Module.objects.filter(id=id).delete()
    return True


def assign_role_to_module(role: Role, module: Module):
    role.modules.add(module)
    return role


def remove_role_from_module(role: Role, module: Module):
    role.modules.remove(module)
    return role