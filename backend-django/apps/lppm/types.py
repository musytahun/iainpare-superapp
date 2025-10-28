import strawberry
from typing import List, Optional

from apps.lppm.models import Penelitian


@strawberry.django.type(Penelitian)
class PenelitianType:
    id: strawberry.ID
    judul_penelitian: str
    # keterangan: Optional[str]
    # jumlah_dana: Optional[int]
    # sumber_dana: Optional[str]

@strawberry.type
class PengabdianType:
    id: strawberry.ID
    judul_pengabdian: str
    # lokasi: Optional[str]
    # jumlah_dana: Optional[int]

@strawberry.type
class PublikasiType:
    id: strawberry.ID
    judul_publikasi: str
    # penerbit: Optional[str]
    # jenis: Optional[str]

@strawberry.type
class LppmProfileType:
    penelitian: List[PenelitianType]
    pengabdian: List[PengabdianType]
    publikasi: List[PublikasiType]