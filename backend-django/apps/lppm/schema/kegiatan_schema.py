# apps/lppm/schema/kegiatan_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional
from datetime import date

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type

class KegiatanQuery:

    @strawberry.field
    # @permission_required("kegiatan.view")
    def get_kegiatan(self, info: Info) -> List[KegiatanType]:
        return get_kegiatan()
    

@strawberry.type
class KegiatanMutation:

    @strawberry.mutation
    # @permission_required("kegiatan.create")
    def create_kegiatan(
        self, 
        info: Info, 
        name: str, 
        keterangan: Optional[str] = None,
        tanggal: Optional[date] = None,
        tempat: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        penanggung_jawab_id: Optional[int] = None,
        ) -> Optional[KegiatanType]:
        kegiatan = create_kegiatan(
            name=name,
            keterangan=keterangan,
            tanggal=tanggal,
            tempat=tempat,
            status=status,
            tahun_id=tahun_id,
            link=link,
            penanggung_jawab_id=penanggung_jawab_id,
            )
        return kegiatan

    @strawberry.mutation
    # @permission_required("kegiatan.update")
    def update_kegiatan(
        self, 
        info: Info, 
        id: int, 
        name: str, 
        keterangan: Optional[str] = None,
        tanggal: Optional[date] = None,
        tempat: Optional[str] = None,
        status: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        penanggung_jawab_id: Optional[int] = None,
        ) -> Optional[KegiatanType]:
        kegiatan = update_kegiatan(
            id=id, 
            name=name,
            keterangan=keterangan,
            tanggal=tanggal,
            tempat=tempat,
            status=status,
            tahun_id=tahun_id,
            link=link,
            penanggung_jawab_id=penanggung_jawab_id,
            )
        return kegiatan

    @strawberry.mutation
    # @permission_required("kegiatan.delete")
    def delete_kegiatan(self, info: Info, id: int) -> bool:
        return delete_kegiatan(id=id)