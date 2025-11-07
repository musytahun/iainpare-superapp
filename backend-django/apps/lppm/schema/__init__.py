import strawberry
from .penelitian_schema import PenelitianQuery, PenelitianMutation
from .pengabdian_schema import PengabdianQuery, PengabdianMutation
from .publikasi_schema import PublikasiQuery, PublikasiMutation
from .dokumen_schema import DokumenQuery, DokumenMutation
from .kegiatan_schema import KegiatanQuery, KegiatanMutation
from .strategic_source_schema import StrategicSourceQuery, StrategicSourceMutation
from .strategic_goal_schema import StrategicGoalQuery, StrategicGoalMutation
from .strategic_objective_schema import StrategicObjectiveQuery, StrategicObjectiveMutation
from .strategic_action_schema import StrategicActionQuery, StrategicActionMutation


@strawberry.type
class Query(
    PenelitianQuery, 
    PengabdianQuery, 
    PublikasiQuery, 
    DokumenQuery, 
    KegiatanQuery, 
    StrategicSourceQuery, 
    StrategicGoalQuery, 
    StrategicObjectiveQuery, 
    StrategicActionQuery
    ):
    """Gabungan semua query di domain accounts"""
    pass


@strawberry.type
class Mutation(
    PenelitianMutation, 
    PengabdianMutation, 
    PublikasiMutation, 
    DokumenMutation, 
    KegiatanMutation, 
    StrategicSourceMutation, 
    StrategicGoalMutation, 
    StrategicObjectiveMutation, 
    StrategicActionMutation
    ):
    """Gabungan semua mutation di domain accounts"""
    pass
