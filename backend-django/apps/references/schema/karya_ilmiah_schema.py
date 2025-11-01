# apps/references/schema/karya_ilmiah_schema.py
import strawberry
from strawberry.types import Info
from typing import List, Optional

from apps.accounts.permissions import permission_required, role_required
from apps.references.types import *
from apps.references.selectors import *
from apps.references.services import *


@strawberry.type
class KaryaIlmiahQuery:

    @strawberry.field
    # @permission_required("karya_ilmiah.view")
    def get_karya_ilmiah(self, info: Info) -> List[KaryaIlmiahType]:
        return get_karya_ilmiah()


@strawberry.type
class KaryaIlmiahMutation:

    @strawberry.mutation
    # @permission_required("karya_ilmiah.create")
    def create_karya_ilmiah(self, info: Info, code: str, name: str) -> Optional[KaryaIlmiahType]:
        karya_ilmiah = create_karya_ilmiah(code=code, name=name)
        return karya_ilmiah

    @strawberry.mutation
    # @permission_required("karya_ilmiah.update")
    def update_karya_ilmiah(self, info: Info, id: int, code: Optional[str] = None, name: Optional[str] = None) -> Optional[KaryaIlmiahType]:
        karya_ilmiah = update_karya_ilmiah(id=id, code=code, name=name)
        return karya_ilmiah

    @strawberry.mutation
    # @permission_required("karya_ilmiah.delete")
    def delete_karya_ilmiah(self, info: Info, id: int) -> bool:
        return delete_karya_ilmiah(id=id)