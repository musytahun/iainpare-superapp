# schema/query.py
import strawberry
from apps.accounts.schema import AccountQuery


@strawberry.type
class Query(AccountQuery):
    """Root Query yang menggabungkan semua query dari tiap app"""
    pass
