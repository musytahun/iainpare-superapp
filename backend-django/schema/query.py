# schema/query.py
import strawberry
from backend.schema import Query as BackendQuery # dummy
from apps.core.schema import Query as CoreQuery # dummy
from apps.accounts.schema import UserQuery, RoleQuery, PermissionQuery, ModuleQuery


@strawberry.type
class Query(BackendQuery, CoreQuery, UserQuery, RoleQuery, PermissionQuery, ModuleQuery):
    """Root Query yang menggabungkan semua query dari tiap app"""
    pass
