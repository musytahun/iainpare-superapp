# schema/mutation.py
import strawberry
from apps.accounts.schema import AuthMutation, AccountMutation, RolePermissionMutation



@strawberry.type
class Mutation(AuthMutation, AccountMutation, RolePermissionMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
