# schema/mutation.py
import strawberry
from apps.accounts.schema import Mutation as AccountsMutation



@strawberry.type
class Mutation(AccountsMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
