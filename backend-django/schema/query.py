# schema/query.py
import strawberry
from backend.schema import Query as BackendQuery # dummy
from apps.core.schema import Query as CoreQuery # dummy
from apps.accounts.schema import AccountQuery


@strawberry.type
class Query(BackendQuery, CoreQuery, AccountQuery):
    """Root Query yang menggabungkan semua query dari tiap app"""
    pass
