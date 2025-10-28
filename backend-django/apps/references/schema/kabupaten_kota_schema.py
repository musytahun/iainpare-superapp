# apps/references/schema/kabupaten_kota_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class KabupatenKotaQuery:

    @strawberry.field
    # @permission_required("kabupaten_kota.view")
    def get_kabupaten_kota(self, info: Info) -> List[KabupatenKotaType]:
        return get_kabupaten_kota()


@strawberry.type
class KabupatenKotaMutation:

    @strawberry.mutation
    # @permission_required("kabupaten_kota.create")
    def create_kabupaten_kota(self, info: Info, code: str, name: str, provinsi_id: Optional[int] = None) -> Optional[KabupatenKotaType]:
        kabupaten_kota = create_kabupaten_kota(code=code, name=name, provinsi_id=provinsi_id)
        return kabupaten_kota

    @strawberry.mutation
    # @permission_required("kabupaten_kota.update")
    def update_kabupaten_kota(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None, provinsi_id: Optional[int] = None) -> Optional[KabupatenKotaType]:
        kabupaten_kota = update_kabupaten_kota(id=id, code=code, name=name, provinsi_id=provinsi_id)
        return kabupaten_kota

    @strawberry.mutation
    # @permission_required("kabupaten_kota.delete")
    def delete_kabupaten_kota(self, info: Info, id: int) -> bool:
        return delete_kabupaten_kota(id=id)