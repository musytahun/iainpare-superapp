# schema/query.py
import strawberry
from backend.schema import Query as BackendQuery # dummy
from apps.core.schema import Query as CoreQuery # dummy
from apps.accounts.schema import Query as AccountsQuery


@strawberry.type
class Query(BackendQuery, CoreQuery, AccountsQuery):
    """Root Query yang menggabungkan semua query dari tiap app"""
    pass
