import strawberry
from .person_schema import PersonQuery
from .dosen_schema import DosenQuery, DosenMutation


@strawberry.type
class Query(PersonQuery, DosenQuery):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(DosenMutation):
    """Gabungan semua mutation di domain accounts"""
    pass
