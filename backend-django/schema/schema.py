# schema/schema.py
import strawberry
from schema.query import Query
from schema.mutation import Mutation

schema = strawberry.Schema(query=Query, mutation=Mutation)
