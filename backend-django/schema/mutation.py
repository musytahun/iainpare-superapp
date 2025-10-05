# schema/mutation.py
import strawberry
from apps.accounts.schema import AuthMutation, AccountMutation



@strawberry.type
class Mutation(AuthMutation, AccountMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
