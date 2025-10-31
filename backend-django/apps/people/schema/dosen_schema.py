# apps/people/schema/dosen_schema.py
import strawberry
from typing import List, Optional
from strawberry.types import Info
from apps.accounts.permissions import permission_required, role_required

from apps.people.types import DosenType, DosenDetailType
from apps.people.selectors import dosen_selector
from apps.people.services import dosen_service


@strawberry.type
class DosenQuery:
    @strawberry.field
    def get_dosen(self, info: Info) -> List[DosenType]:
        return dosen_selector.get_dosen()

    @strawberry.field
    def dosen_detail(self, info: Info, id: int) -> DosenDetailType:
        data = dosen_service.get_dosen_with_lppm_detail(id)
        return DosenDetailType(
            id=data["dosen"].id,
            # name=data["dosen"].name,
            nidn=data["dosen"].nidn,
            # jabatan_fungsional_id=data["dosen"].jabatan_fungsional_id,
            # program_studi_id=data["dosen"].program_studi_id,
            penelitian=data["penelitian"],
            pengabdian=data["pengabdian"],
            publikasi=data["publikasi"],
        )



@strawberry.type
class DosenMutation:

    @strawberry.mutation
    # @permission_required("dosen.create")
    def create_dosen(self, info: Info, 
                     name: Optional[str], 
                     email: Optional[str] = None, 
                     nomor_hp: Optional[str] = None, 
                     alamat: Optional[str] = None, 
                     foto_profil: Optional[str] = None, 
                     nidn: Optional[str] = None, 
                     nip: Optional[str] = None,
                     gelar_depan: Optional[str] = None, 
                     gelar_belakang: Optional[str] = None,
                     jabatan_fungsional_id: Optional[int] = None,
                     pangkat_golongan_id: Optional[int] = None,
                     program_studi_id: Optional[int] = None,
                     bidang_kepakaran_id: Optional[int] = None
                    ) -> Optional[DosenType]:
        dosen = dosen_service.create_dosen(
            name=name, 
            email=email, 
            nomor_hp=nomor_hp, 
            alamat=alamat, 
            foto_profil=foto_profil, 
            nidn=nidn, 
            nip=nip,
            gelar_depan=gelar_depan, 
            gelar_belakang=gelar_belakang,
            jabatan_fungsional_id=jabatan_fungsional_id,
            pangkat_golongan_id=pangkat_golongan_id,
            program_studi_id=program_studi_id,
            bidang_kepakaran_id=bidang_kepakaran_id
            )
        return dosen

    @strawberry.mutation
    # @permission_required("dosen.update")
    def update_dosen(self, info: Info, id: int, 
                     name: Optional[str], 
                     email: Optional[str] = None, 
                     nomor_hp: Optional[str] = None, 
                     alamat: Optional[str] = None, 
                     foto_profil: Optional[str] = None, 
                     nidn: Optional[str] = None, 
                     nip: Optional[str] = None,
                     gelar_depan: Optional[str] = None, 
                     gelar_belakang: Optional[str] = None,
                     jabatan_fungsional_id: Optional[int] = None,
                     pangkat_golongan_id: Optional[int] = None,
                     program_studi_id: Optional[int] = None,
                     bidang_kepakaran_id: Optional[int] = None
                     ) -> Optional[DosenType]:
        dosen = dosen_service.update_dosen(
            id=id, 
            name=name, 
            email=email, 
            nomor_hp=nomor_hp, 
            alamat=alamat, 
            foto_profil=foto_profil, 
            nidn=nidn, 
            nip=nip,
            gelar_depan=gelar_depan, 
            gelar_belakang=gelar_belakang,
            jabatan_fungsional_id=jabatan_fungsional_id,
            pangkat_golongan_id=pangkat_golongan_id,
            program_studi_id=program_studi_id,
            bidang_kepakaran_id=bidang_kepakaran_id
            )
        return dosen

    @strawberry.mutation
    # @permission_required("dosen.delete")
    def delete_dosen(self, info: Info, id: int) -> bool:
        return dosen_service.delete_dosen(id=id)