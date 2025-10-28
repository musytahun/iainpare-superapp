# apps/references/selectors/bidang_kepakaran_selector.py
from typing import List
from apps.references.models import BidangKepakaran


def get_bidang_kepakaran() -> List[BidangKepakaran]:
    return BidangKepakaran.objects.all().order_by("name")

def get_bidang_kepakaran_by_id(*, id: int):
    return BidangKepakaran.objects.filter(pk=id).first()