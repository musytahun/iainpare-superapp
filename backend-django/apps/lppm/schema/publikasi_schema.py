# apps/lppm/schema/publikasi_schema.py
from decimal import Decimal
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.lppm.types import *
from apps.lppm.selectors import *
from apps.lppm.services import *


@strawberry.type
class PublikasiQuery:

    @strawberry.field
    # @permission_required("publikasi.view")
    def get_publikasi(self, info: Info) -> List[PublikasiType]:
        return get_publikasi()
    
    @strawberry.field
    def publikasi_profile(self, info: Info, dosen_id: int) -> PublikasiType:
        data = publikasi_service.get_publikasi_for_dosen(dosen_id)
        return PublikasiType(
            publikasi=data["publikasi"]
        )
    

@strawberry.type
class PublikasiMutation:

    @strawberry.mutation
    # @permission_required("publikasi.create")
    def create_publikasi(
        self, 
        info: Info, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        indeksasi_id: Optional[int] = None,
        penerbit_id: Optional[int] = None,
        no_regis: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        karya_ilmiah_id: Optional[int] = None
        ) -> Optional[PublikasiType]:
        publikasi = create_publikasi(
            judul=judul,
            ketua_id=ketua_id,
            anggota_ids=anggota_ids,
            keterangan=keterangan,
            kelompok_keilmuan_id=kelompok_keilmuan_id,
            indeksasi_id=indeksasi_id,
            penerbit_id=penerbit_id,
            no_regis=no_regis,
            tahun_id=tahun_id,
            link=link,
            karya_ilmiah_id=karya_ilmiah_id
            )
        return publikasi

    @strawberry.mutation
    # @permission_required("publikasi.update")
    def update_publikasi(
        self, 
        info: Info, 
        id: int, 
        judul: str, 
        ketua_id: Optional[int] = None,
        anggota_ids: Optional[List[int]] = None,
        keterangan: Optional[str] = None,
        kelompok_keilmuan_id: Optional[int] = None,
        indeksasi_id: Optional[int] = None,
        penerbit_id: Optional[int] = None,
        no_regis: Optional[str] = None,
        tahun_id: Optional[int] = None,
        link: Optional[str] = None,
        karya_ilmiah_id: Optional[int] = None
        ) -> Optional[PublikasiType]:
        publikasi = update_publikasi(
            id=id, 
            judul=judul,
            ketua_id=ketua_id,
            anggota_ids=anggota_ids,
            keterangan=keterangan,
            kelompok_keilmuan_id=kelompok_keilmuan_id,
            indeksasi_id=indeksasi_id,
            penerbit_id=penerbit_id,
            no_regis=no_regis,
            tahun_id=tahun_id,
            link=link,
            karya_ilmiah_id=karya_ilmiah_id
            )
        return publikasi

    @strawberry.mutation
    # @permission_required("publikasi.delete")
    def delete_publikasi(self, info: Info, id: int) -> bool:
        return delete_publikasi(id=id)