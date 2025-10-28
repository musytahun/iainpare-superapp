import strawberry
from .dosen_schema import DosenQuery


@strawberry.type
class Query(DosenQuery):
    """Gabungan semua query di domain accounts"""
    pass


# @strawberry.type
# class Mutation(AuthMutation):
#     """Gabungan semua mutation di domain accounts"""
#     pass
