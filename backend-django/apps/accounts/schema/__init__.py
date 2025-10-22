import strawberry
from .auth_schema import AuthMutation
from .user_schema import UserQuery, UserMutation
from .role_schema import RoleQuery, RoleMutation
from .permission_schema import PermissionQuery, PermissionMutation
from .module_schema import ModuleQuery, ModuleMutation


@strawberry.type
class Query(UserQuery, RoleQuery, PermissionQuery, ModuleQuery):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(AuthMutation, UserMutation, RoleMutation, PermissionMutation, ModuleMutation):
    """Gabungan semua mutation di domain accounts"""
    pass
