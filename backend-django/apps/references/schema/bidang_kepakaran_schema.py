# apps/references/schema/bidang_kepakaran_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class BidangKepakaranQuery:

    @strawberry.field
    # @permission_required("bidang_kepakaran.view")
    def get_bidang_kepakaran(self, info: Info) -> List[BidangKepakaranType]:
        return get_bidang_kepakaran()


@strawberry.type
class BidangKepakaranMutation:

    @strawberry.mutation
    # @permission_required("bidang_kepakaran.create")
    def create_bidang_kepakaran(self, info: Info, code: str, name: str) -> Optional[BidangKepakaranType]:
        bidang_kepakaran = create_bidang_kepakaran(code=code, name=name)
        return bidang_kepakaran

    @strawberry.mutation
    # @permission_required("bidang_kepakaran.update")
    def update_bidang_kepakaran(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[BidangKepakaranType]:
        bidang_kepakaran = update_bidang_kepakaran(id=id, code=code, name=name)
        return bidang_kepakaran

    @strawberry.mutation
    # @permission_required("bidang_kepakaran.delete")
    def delete_bidang_kepakaran(self, info: Info, id: int) -> bool:
        return delete_bidang_kepakaran(id=id)