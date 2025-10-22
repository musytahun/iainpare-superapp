# apps/accounts/schema/module_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.types import AuthPayload, UserType, RoleType, PermissionType, ModuleType
from apps.accounts.selectors import *
from apps.accounts.services import *
from apps.accounts.permissions import permission_required, role_required, require_permission, require_role


@strawberry.type
class ModuleQuery:
    # modules: List[ModuleType] = strawberry.field(resolver=get_modules)
    # module: Optional[ModuleType] = strawberry.field(resolver=get_module_by_id)

    @strawberry.field
    @permission_required("module.view")
    def modules(self, info: Info) -> List[ModuleType]:
        return get_modules()
    
    module: Optional[ModuleType] = strawberry.field(resolver=get_module_by_id)


@strawberry.type
class ModuleMutation:
    # create_module: ModuleType = strawberry.mutation(resolver=create_module)
    # update_module: ModuleType = strawberry.mutation(resolver=update_module)
    # delete_module: bool = strawberry.mutation(resolver=delete_module)


    @strawberry.mutation
    @permission_required("module.create")
    def create_module(self, info: Info, name: str, code: str, icon: str, url: str, role_ids: Optional[List[int]] = None) -> ModuleType:
        return create_module(name=name, code=code, icon=icon, url=url, role_ids=role_ids) # create_module(name=name, code=code, icon=icon=icon, url=url, role_ids   =role_ids) # create_module(name=name, code=code, icon)

    @strawberry.mutation
    @permission_required("module.update")
    def update_module(self, info: Info, id: int, name: Optional[str] = None, code: Optional[str] = None, icon: Optional[str] = None, url: Optional[str] = None, role_ids: Optional[List[int]] = None) -> ModuleType:
        return update_module(id=id, name=name, code=code, icon=icon, url=url, role_ids=role_ids)

    @strawberry.mutation
    @permission_required("module.delete")
    def delete_module(self, info: Info, id: int) -> bool:
        return delete_module(id=id)