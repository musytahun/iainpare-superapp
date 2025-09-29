import strawberry

@strawberry.type
class Query:
    @strawberry.field
    def core_message(self) -> str:
        return "hi, this is core's schema. yeah you did it"
