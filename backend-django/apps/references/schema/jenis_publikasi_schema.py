# apps/references/schema/jenis_publikasi_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class JenisPublikasiQuery:

    @strawberry.field
    # @permission_required("jenis_publikasi.view")
    def get_jenis_publikasi(self, info: Info) -> List[JenisPublikasiType]:
        return get_jenis_publikasi()


@strawberry.type
class JenisPublikasiMutation:

    @strawberry.mutation
    # @permission_required("jenis_publikasi.create")
    def create_jenis_publikasi(self, info: Info, code: str, name: str) -> Optional[JenisPublikasiType]:
        jenis_publikasi = create_jenis_publikasi(code=code, name=name)
        return jenis_publikasi

    @strawberry.mutation
    # @permission_required("jenis_publikasi.update")
    def update_jenis_publikasi(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JenisPublikasiType]:
        jenis_publikasi = update_jenis_publikasi(id=id, code=code, name=name)
        return jenis_publikasi

    @strawberry.mutation
    # @permission_required("jenis_publikasi.delete")
    def delete_jenis_publikasi(self, info: Info, id: int) -> bool:
        return delete_jenis_publikasi(id=id)