import strawberry
from .penelitian_schema import PenelitianQuery, PenelitianMutation
from .pengabdian_schema import PengabdianQuery
from .publikasi_schema import PublikasiQuery


@strawberry.type
class Query(PenelitianQuery, PengabdianQuery, PublikasiQuery):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(PenelitianMutation):
    """Gabungan semua mutation di domain accounts"""
    pass
