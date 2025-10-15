# apps/accounts/schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from .types import AuthPayload, UserType, RoleType, PermissionType
from .selectors import * # query
from .services import * # mutation
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
class AccountQuery:
    # users: List[UserType] = strawberry.field(resolver=get_users)
    # @strawberry.field
    # def users(self, info: Info) -> List[UserType]:
    #     require_permission(info, "user.view")  # hanya yg punya izin view
    #     return get_users()
    @strawberry.field
    def users(self, info: Info) -> List[UserType]:
        # prefetch untuk m2m role dan permission
        return User.objects.prefetch_related("roles__permissions").all()
    
    # user_by_id: Optional[UserType] = strawberry.field(resolver=get_user_by_id)
    @strawberry.field
    def user_by_id(self, info: Info, id: int) -> Optional[UserType]:
        # require_role(info, ["admin"])  # dipakai jika hanya yg punya role admin
        return get_user_by_id(id=id)

    user_by_username: Optional[UserType] = strawberry.field(resolver=get_user_by_username)


@strawberry.type
class AccountMutation:
    # create_user: UserType = strawberry.mutation(resolver=create_user)
    # update_user: UserType = strawberry.mutation(resolver=update_user)
    # delete_user: bool = strawberry.mutation(resolver=delete_user)
    # Buat user baru
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
    def update_user_role(self, info: Info, id: int, role_ids: List[int]) -> UserType:
        user = User.objects.get(pk=id)
        user.roles.set(role_ids)
        user.save()
        return user


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