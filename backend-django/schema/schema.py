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
        active_module = request.META.get("HTTP_X_ACTIVE_MODULE")
        active_role = request.META.get("HTTP_X_ACTIVE_ROLE")
        
        return {
            "request": request,
            "user": getattr(request, "user", None),
            # "active_module": getattr(request, "active_module", None),
            # "active_role": getattr(request, "active_role", None),
            "active_module": active_module,
            "active_role": active_role,
        }