# apps/accounts/schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from .types import AuthPayload, UserType, RoleType, PermissionType, ModuleType
from .selectors import *
from .services import *
from .permissions import permission_required, role_required, require_permission, require_role

# ==== AUTH ====

@strawberry.type
class AuthMutation:
    @strawberry.mutation
    def login(self, info: Info, username: str, password: str) -> AuthPayload:
        return authenticate_user(username, password)
    
    @strawberry.mutation
    def refresh_token(self, info: Info, refresh_token: str) -> AuthPayload:
        return refresh_access_token(refresh_token)


# ==== USER ====

@strawberry.type
class UserQuery:
    @strawberry.field
    @permission_required("user.view")
    def users(self, info: Info) -> List[UserType]:
        # require_permission(info, "user.view")  # dipakai jika izinnya khusus tidak semua code
        return get_users()
    
    @strawberry.field
    @permission_required("user.view")
    def user_by_id(self, info: Info, id: int) -> Optional[UserType]:
        # require_role(info, ["admin"])  # dipakai jika rolenya khusus tidak semua code
        return get_user_by_id(id=id)

    user_by_username: Optional[UserType] = strawberry.field(resolver=get_user_by_username)

    @strawberry.field
    @permission_required("user.view")
    def current_context(self, info: Info) -> str:
        ctx = info.context
        return f"Active Module: {ctx.active_module}, Role: {ctx.active_role}"

    # @strawberry.field
    # def accessible_roles(self, info: Info) -> List[RoleType]:
    #     user = info.context.user
    #     active_module = info.context.active_module
    #     if not active_module:
    #         return []
    #     return list(Role.objects.filter(users=user, modules__code=active_module))
    
    @strawberry.field
    def user_modules(self, info: Info) -> List[ModuleType]:
        user = info.context["user"]
        return get_user_modules(user)


@strawberry.type
class UserMutation:
    @strawberry.mutation
    @permission_required("user.create")
    def create_user(self, info: Info, username: str, password: str, email: str, full_name: str = "", role_ids: list[int] = None) -> UserType:
        return create_user(username=username, password=password, email=email, full_name=full_name, role_ids=role_ids)

    @strawberry.mutation
    @permission_required("user.update")
    def update_user(self, info: Info, id: int, username: str, email: str, full_name: str, role_ids: list[int]) -> UserType:
        return update_user(id=id, username=username, email=email, full_name=full_name, role_ids=role_ids)

    @strawberry.mutation
    @permission_required("user.delete")
    def delete_user(self, info: Info, id: int) -> bool:
        return delete_user(id=id)
    
    @strawberry.mutation
    @permission_required("user.update")
    def update_user_role(self, info: Info, id: int, role_ids: List[int]) -> UserType:
        user = User.objects.get(pk=id)
        user.roles.set(role_ids)
        user.save()
        return user


# ==== ROLE ====

@strawberry.type
class RoleQuery:
    @strawberry.field
    @permission_required("role.view")
    def roles(self, info: Info) -> List[RoleType]:
        return get_roles()
    role: Optional[RoleType] = strawberry.field(resolver=get_role_by_id)


@strawberry.type
class RoleMutation:
    create_role: RoleType = strawberry.mutation(resolver=create_role)
    update_role: RoleType = strawberry.mutation(resolver=update_role)
    delete_role: bool = strawberry.mutation(resolver=delete_role)


# ==== PERMISSION ====

@strawberry.type
class PermissionQuery:
    permissions: List[PermissionType] = strawberry.field(resolver=get_permissions)
    permission: Optional[PermissionType] = strawberry.field(resolver=get_permission_by_id)


@strawberry.type
class PermissionMutation:
    create_permission: PermissionType = strawberry.mutation(resolver=create_permission)
    update_permission: PermissionType = strawberry.mutation(resolver=update_permission)
    delete_permission: bool = strawberry.mutation(resolver=delete_permission)


# ==== MODULE ====

@strawberry.type
class ModuleQuery:
    modules: List[ModuleType] = strawberry.field(resolver=get_modules)
    module: Optional[ModuleType] = strawberry.field(resolver=get_module_by_id)


@strawberry.type
class ModuleMutation:
    create_module: ModuleType = strawberry.mutation(resolver=create_module)
    update_module: ModuleType = strawberry.mutation(resolver=update_module)
    delete_module: bool = strawberry.mutation(resolver=delete_module)