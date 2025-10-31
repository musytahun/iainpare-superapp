# apps/lppm/schema/penelitian_schema.py
from decimal import Decimal
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class PenelitianQuery:

    @strawberry.field
    # @permission_required("penelitian.view")
    def get_penelitian(self, info: Info) -> List[PenelitianType]:
        return get_penelitian()
    
    @strawberry.field
    def penelitian_profile(self, info: Info, dosen_id: int) -> PenelitianType:
        data = penelitian_service.get_penelitian_for_dosen(dosen_id)
        return PenelitianType(
            penelitian=data["penelitian"]
        )
    

@strawberry.type
class PenelitianMutation:

    @strawberry.mutation
    # @permission_required("penelitian.create")
    def create_penelitian(
        self, 
        info: Info, 
        judul: str,
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        ketua_peneliti_id: Optional[int] = None,
        anggota_peneliti_ids: Optional[List[int]] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_riset_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None
        ) -> Optional[PenelitianType]:
        penelitian = create_penelitian(
            judul=judul,
            ketua_peneliti_id=ketua_peneliti_id,
            anggota_peneliti_ids=anggota_peneliti_ids,
            keterangan=keterangan,
            jumlah_dana=jumlah_dana,
            sumber_dana_id=sumber_dana_id,
            kelompok_riset_id=kelompok_riset_id,
            jenis_kolaborasi_id=jenis_kolaborasi_id,
            tahun_id=tahun_id
            )
        return penelitian

    @strawberry.mutation
    # @permission_required("penelitian.update")
    def update_penelitian(
        self, 
        info: Info, 
        id: int, 
        judul: str, 
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        ketua_peneliti_id: Optional[int] = None,
        anggota_peneliti_ids: Optional[List[int]] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_riset_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None
        ) -> Optional[PenelitianType]:
        penelitian = update_penelitian(
            id=id, 
            judul=judul,
            ketua_peneliti_id=ketua_peneliti_id,
            anggota_peneliti_ids=anggota_peneliti_ids,
            keterangan=keterangan,
            jumlah_dana=jumlah_dana,
            sumber_dana_id=sumber_dana_id,
            kelompok_riset_id=kelompok_riset_id,
            jenis_kolaborasi_id=jenis_kolaborasi_id,
            tahun_id=tahun_id
            )
        return penelitian

    @strawberry.mutation
    # @permission_required("penelitian.delete")
    def delete_penelitian(self, info: Info, id: int) -> bool:
        return delete_penelitian(id=id)