# apps/references/schema/jenis_kolaborasi_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class JenisKolaborasiQuery:

    @strawberry.field
    # @permission_required("jenis_kolaborasi.view")
    def get_jenis_kolaborasi(self, info: Info) -> List[JenisKolaborasiType]:
        return get_jenis_kolaborasi()


@strawberry.type
class JenisKolaborasiMutation:

    @strawberry.mutation
    # @permission_required("jenis_kolaborasi.create")
    def create_jenis_kolaborasi(self, info: Info, code: str, name: str) -> Optional[JenisKolaborasiType]:
        jenis_kolaborasi = create_jenis_kolaborasi(code=code, name=name)
        return jenis_kolaborasi

    @strawberry.mutation
    # @permission_required("jenis_kolaborasi.update")
    def update_jenis_kolaborasi(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[JenisKolaborasiType]:
        jenis_kolaborasi = update_jenis_kolaborasi(id=id, code=code, name=name)
        return jenis_kolaborasi

    @strawberry.mutation
    # @permission_required("jenis_kolaborasi.delete")
    def delete_jenis_kolaborasi(self, info: Info, id: int) -> bool:
        return delete_jenis_kolaborasi(id=id)