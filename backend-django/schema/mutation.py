# schema/mutation.py
import strawberry
from apps.accounts.schema import Mutation as AccountsMutation
from apps.references.schema import Mutation as ReferencesMutation
from apps.people.schema import Mutation as PeopleMutation
from apps.lppm.schema import Mutation as LppmMutation



@strawberry.type
class Mutation(AccountsMutation, ReferencesMutation, PeopleMutation, LppmMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
