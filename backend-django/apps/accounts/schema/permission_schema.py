# apps/accounts/schema/permission_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.types import AuthPayload, UserType, RoleType, PermissionType, ModuleType
from apps.accounts.selectors import *
from apps.accounts.services import *
from apps.accounts.permissions import permission_required, role_required, require_permission, require_role


@strawberry.type
class PermissionQuery:
    # permissions: List[PermissionType] = strawberry.field(resolver=get_permissions)
    # permission: Optional[PermissionType] = strawberry.field(resolver=get_permission_by_id)

    @strawberry.field
    @permission_required("permission.view")
    def permissions(self, info: Info) -> List[PermissionType]:
        return get_permissions()
    
    permission: Optional[PermissionType] = strawberry.field(resolver=get_permission_by_id)


@strawberry.type
class PermissionMutation:
    # create_permission: PermissionType = strawberry.mutation(resolver=create_permission)
    # update_permission: PermissionType = strawberry.mutation(resolver=update_permission)
    # delete_permission: bool = strawberry.mutation(resolver=delete_permission)

    @strawberry.mutation
    @permission_required("permission.create")
    def create_permission(self, info: Info, name: str, code: str) -> PermissionType:
        return create_permission(name=name, code=code)

    @strawberry.mutation
    @permission_required("permission.update")
    def update_permission(self, info: Info, id: int, name: Optional[str] = None, code: Optional[str] = None) -> PermissionType:
        return update_permission(id=id, name=name, code=code)

    @strawberry.mutation
    @permission_required("permission.delete")
    def delete_permission(self, info: Info, id: int) -> bool:
        return delete_permission(id=id)