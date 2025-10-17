# schema/mutation.py
import strawberry
from apps.accounts.schema import AuthMutation, UserMutation, RoleMutation, PermissionMutation, ModuleMutation



@strawberry.type
class Mutation(AuthMutation, UserMutation, RoleMutation, PermissionMutation, ModuleMutation):
    """Root Mutation yang menggabungkan semua mutation dari tiap app"""
    pass
