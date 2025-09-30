import strawberry
from apps.core.schema import Query as CoreQuery

@strawberry.type
class Query(CoreQuery):
    @strawberry.field
    def backend_message(self) -> str:
        return "hi, this is backend's schema. it's great. awesome"

schema = strawberry.Schema(query=Query)
