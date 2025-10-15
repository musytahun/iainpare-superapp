import strawberry

@strawberry.type
class Query:
    @strawberry.field
    def backend_message(self) -> str:
        return "hi, this is backend's schema."
