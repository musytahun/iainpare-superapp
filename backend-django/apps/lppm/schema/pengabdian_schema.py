# apps/lppm/schema/pengabdian_schema.py
from decimal import Decimal
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class PengabdianQuery:

    @strawberry.field
    # @permission_required("pengabdian.view")
    def get_pengabdian(self, info: Info) -> List[PengabdianType]:
        return get_pengabdian()
    
    @strawberry.field
    def pengabdian_profile(self, info: Info, dosen_id: int) -> PengabdianType:
        data = pengabdian_service.get_pengabdian_for_dosen(dosen_id)
        return PengabdianType(
            pengabdian=data["pengabdian"]
        )
    

@strawberry.type
class PengabdianMutation:

    @strawberry.mutation
    # @permission_required("pengabdian.create")
    def create_pengabdian(
        self, 
        info: Info, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None,
        lokasi_id: Optional[int] = None
        ) -> Optional[PengabdianType]:
        pengabdian = create_pengabdian(
            judul=judul,
            ketua_id=ketua_id,
            anggota_ids=anggota_ids,
            keterangan=keterangan,
            jumlah_dana=jumlah_dana,
            sumber_dana_id=sumber_dana_id,
            kelompok_keilmuan_id=kelompok_keilmuan_id,
            jenis_kolaborasi_id=jenis_kolaborasi_id,
            tahun_id=tahun_id,
            lokasi_id=lokasi_id
            )
        return pengabdian

    @strawberry.mutation
    # @permission_required("pengabdian.update")
    def update_pengabdian(
        self, 
        info: Info, 
        id: int, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        jumlah_dana: Optional[Decimal] = None,
        sumber_dana_id: Optional[int] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        jenis_kolaborasi_id: Optional[int] = None,
        tahun_id: Optional[int] = None,
        lokasi_id: Optional[int] = None
        ) -> Optional[PengabdianType]:
        pengabdian = update_pengabdian(
            id=id, 
            judul=judul,
            ketua_id=ketua_id,
            anggota_ids=anggota_ids,
            keterangan=keterangan,
            jumlah_dana=jumlah_dana,
            sumber_dana_id=sumber_dana_id,
            kelompok_keilmuan_id=kelompok_keilmuan_id,
            jenis_kolaborasi_id=jenis_kolaborasi_id,
            tahun_id=tahun_id,
            lokasi_id=lokasi_id
            )
        return pengabdian

    @strawberry.mutation
    # @permission_required("pengabdian.delete")
    def delete_pengabdian(self, info: Info, id: int) -> bool:
        return delete_pengabdian(id=id)