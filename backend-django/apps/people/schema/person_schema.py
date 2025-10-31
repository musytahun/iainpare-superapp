# apps/people/schema/person_schema.py
import strawberry
from typing import List, Optional
from strawberry.types import Info
from apps.accounts.permissions import permission_required, role_required

from apps.people.types import PersonType
from apps.people.selectors import person_selector


@strawberry.type
class PersonQuery:
    @strawberry.field
    def get_person(self, info: Info) -> List[PersonType]:
        return person_selector.get_person()
