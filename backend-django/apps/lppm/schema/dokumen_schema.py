# apps/lppm/schema/dokumen_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type

class DokumenQuery:

    @strawberry.field
    # @permission_required("dokumen.view")
    def get_dokumen(self, info: Info) -> List[DokumenType]:
        return get_dokumen()
    

@strawberry.type
class DokumenMutation:

    @strawberry.mutation
    # @permission_required("dokumen.create")
    def create_dokumen(
        self, 
        info: Info, 
        name: str, 
        keterangan: Optional[str] = None,
        kriteria_terkait: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        ) -> Optional[DokumenType]:
        dokumen = create_dokumen(
            name=name,
            keterangan=keterangan,
            kriteria_terkait=kriteria_terkait,
            status=status,
            tahun_id=tahun_id,
            link=link,
            )
        return dokumen

    @strawberry.mutation
    # @permission_required("dokumen.update")
    def update_dokumen(
        self, 
        info: Info, 
        id: int, 
        name: str, 
        keterangan: Optional[str] = None,
        kriteria_terkait: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        ) -> Optional[DokumenType]:
        dokumen = update_dokumen(
            id=id, 
            name=name,
            keterangan=keterangan,
            kriteria_terkait=kriteria_terkait,
            status=status,
            tahun_id=tahun_id,
            link=link,
            )
        return dokumen

    @strawberry.mutation
    # @permission_required("dokumen.delete")
    def delete_dokumen(self, info: Info, id: int) -> bool:
        return delete_dokumen(id=id)