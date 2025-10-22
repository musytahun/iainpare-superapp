# apps/accounts/schema/auth_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.types import AuthPayload, UserType, RoleType, PermissionType, ModuleType
from apps.accounts.selectors import *
from apps.accounts.services import *
from apps.accounts.permissions import permission_required, role_required, require_permission, require_role


@strawberry.type
class AuthMutation:
    @strawberry.mutation
    def login(self, info: Info, username: str, password: str) -> AuthPayload:
        return authenticate_user(username, password)
    
    @strawberry.mutation
    def refresh_token(self, info: Info, refresh_token: str) -> AuthPayload:
        return refresh_access_token(refresh_token)