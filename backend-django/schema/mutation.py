# schema/mutation.py
import strawberry
from apps.accounts.schema import Mutation as AccountsMutation
from apps.references.schema import Mutation as ReferencesMutation



@strawberry.type
class Mutation(AccountsMutation, ReferencesMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
