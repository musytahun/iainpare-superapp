# apps/accounts/schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from .types import AuthPayload, UserType, RoleType, PermissionType
from .selectors import * # query
from .services import * # mutation
from .permissions import require_permission

# ==== AUTH ====

@strawberry.type
class AuthMutation:
    @strawberry.mutation
    def login(self, info: Info, username: str, password: str) -> AuthPayload:
        result = authenticate_user(username, password)
        return AuthPayload(token=result.token, username=result)


# ==== USER ====

@strawberry.type
class AccountQuery:
    # users: List[UserType] = strawberry.field(resolver=get_users)
    @strawberry.field
    def users(self, info: Info) -> List[UserType]:
        require_permission(info, "user.view")  # hanya yg punya izin view
        return get_users()
    
    user_by_id: Optional[UserType] = strawberry.field(resolver=get_user_by_id)
    # def user_by_id(self, info: Info, id: int) -> Optional[UserType]:
    #     require_role(info, ["admin", "staff"])
    #     return get_user_by_id(id=id)

    user_by_username: Optional[UserType] = strawberry.field(resolver=get_user_by_username)


@strawberry.type
class AccountMutation:
    # Buat user baru
    create_user: UserType = strawberry.mutation(resolver=create_user)
    update_user: UserType = strawberry.mutation(resolver=update_user)
    delete_user: bool = strawberry.mutation(resolver=delete_user)
    
    @strawberry.mutation
    def update_user_role(self, id: int, role_id: int) -> UserType:
        return update_user_role(id=id, role_id=role_id)


# ==== ROLE & PERMISSION ====

@strawberry.type
class RolePermissionQuery:
    roles: List[RoleType] = strawberry.field(resolver=get_roles)
    permissions: List[PermissionType] = strawberry.field(resolver=get_permissions)
    role: Optional[RoleType] = strawberry.field(resolver=get_role_by_id)
    permission: Optional[PermissionType] = strawberry.field(resolver=get_permission_by_id)


@strawberry.type
class RolePermissionMutation:
    create_role: RoleType = strawberry.mutation(resolver=create_role)
    update_role: RoleType = strawberry.mutation(resolver=update_role)
    delete_role: bool = strawberry.mutation(resolver=delete_role)
    create_permission: PermissionType = strawberry.mutation(resolver=create_permission)
    update_permission: PermissionType = strawberry.mutation(resolver=update_permission)
    delete_permission: bool = strawberry.mutation(resolver=delete_permission)