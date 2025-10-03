# schema/mutation.py
import strawberry
from apps.accounts.schema import AccountMutation


@strawberry.type
class Mutation(AccountMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
