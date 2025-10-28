# apps/lppm/schema/pengabdian_schema.py
import strawberry
from strawberry.types import Info

from apps.lppm.types import PengabdianType
from apps.lppm.services import pengabdian_service


@strawberry.type
class PengabdianQuery:
    @strawberry.field
    def pengabdian_profile(self, info: Info, dosen_id: int) -> PengabdianType:
        data = pengabdian_service.get_pengabdian_for_dosen(dosen_id)
        return PengabdianType(
            pengabdian=data["pengabdian"]
        )