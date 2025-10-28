# schema/query.py
import strawberry
from backend.schema import Query as BackendQuery # dummy
from apps.core.schema import Query as CoreQuery # dummy
from apps.accounts.schema import Query as AccountsQuery
from apps.references.schema import Query as ReferencesQuery
from apps.people.schema import Query as PeopleQuery
from apps.lppm.schema import Query as LppmQuery


@strawberry.type
class Query(BackendQuery, CoreQuery, AccountsQuery, ReferencesQuery, PeopleQuery, LppmQuery):
    """Root Query yang menggabungkan semua query dari tiap app"""
    pass
