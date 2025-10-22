# apps/accounts/schema/role_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.types import AuthPayload, UserType, RoleType, PermissionType, ModuleType
from apps.accounts.selectors import *
from apps.accounts.services import *
from apps.accounts.permissions import permission_required, role_required, require_permission, require_role


@strawberry.type
class RoleQuery:
    @strawberry.field
    @permission_required("role.view")
    def roles(self, info: Info) -> List[RoleType]:
        return get_roles()
    
    role: Optional[RoleType] = strawberry.field(resolver=get_role_by_id)


@strawberry.type
class RoleMutation:
    # create_role: RoleType = strawberry.mutation(resolver=create_role)
    # update_role: RoleType = strawberry.mutation(resolver=update_role)
    # delete_role: bool = strawberry.mutation(resolver=delete_role)

    @strawberry.mutation
    @permission_required("role.create")
    def create_role(self, info: Info, name: str, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> RoleType:
        return create_role(name=name, permission_ids=permission_ids, module_ids=module_ids)

    @strawberry.mutation
    @permission_required("role.update")
    def update_role(self, info: Info, id: int, name: Optional[str] = None, permission_ids: Optional[List[int]] = None, module_ids: Optional[List[int]] = None) -> RoleType:
        return update_role(id=id, name=name, permission_ids=permission_ids, module_ids=module_ids)

    @strawberry.mutation
    @permission_required("role.delete")
    def delete_role(self, info: Info, id: int) -> bool:
        return delete_role(id=id)