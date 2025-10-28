# apps/lppm/schema/publikasi_schema.py
import strawberry
from strawberry.types import Info

from apps.lppm.types import PublikasiType
from apps.lppm.services import publikasi_service


@strawberry.type
class PublikasiQuery:
    @strawberry.field
    def publikasi_profile(self, info: Info, dosen_id: int) -> PublikasiType:
        data = publikasi_service.get_publikasi_for_dosen(dosen_id)
        return PublikasiType(
            publikasi=data["publikasi"]
        )