# schema/schema.py
import strawberry
from schema.query import Query
from schema.mutation import Mutation
from strawberry.django.views import GraphQLView

from strawberry.types import Info
from django.http import HttpRequest

schema = strawberry.Schema(query=Query, mutation=Mutation)

class CustomGraphQLView(GraphQLView):
    def get_context(self, request: HttpRequest, response):
        return {
            "request": request,
            "user": getattr(request, "user", None),
            "module": getattr(request, "active_module", None),
            "role": getattr(request, "active_role", None),
        }