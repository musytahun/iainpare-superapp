import strawberry
from .penelitian_schema import PeneliitianQuery
from .pengabdian_schema import PengabdianQuery
from .publikasi_schema import PublikasiQuery


@strawberry.type
class Query(PeneliitianQuery, PengabdianQuery, PublikasiQuery):
    """Gabungan semua query di domain accounts"""
    pass


# @strawberry.type
# class Mutation(AuthMutation, UserMutation, RoleMutation, PermissionMutation, ModuleMutation):
#     """Gabungan semua mutation di domain accounts"""
#     pass
