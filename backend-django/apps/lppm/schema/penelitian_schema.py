# apps/lppm/schema/penelitian_schema.py
import strawberry
from strawberry.types import Info

from apps.lppm.types import PenelitianType
from apps.lppm.services import penelitian_service


@strawberry.type
class PeneliitianQuery:
    @strawberry.field
    def penelitian_profile(self, info: Info, dosen_id: int) -> PenelitianType:
        data = penelitian_service.get_penelitian_for_dosen(dosen_id)
        return PenelitianType(
            penelitian=data["penelitian"]
        )