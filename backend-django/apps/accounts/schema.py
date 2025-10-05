# apps/accounts/schema.py
import strawberry
from strawberry.types import Info
from typing import Optional, List
from .types import AuthPayload, UserType
from .selectors import get_users, get_user_by_id, get_user_by_username # query
from .services import authenticate_user, create_user, update_user, delete_user # mutation

@strawberry.type
class AuthMutation:
    @strawberry.mutation
    def login(self, username: str, password: str, info: Info) -> AuthPayload:
        result = authenticate_user(username, password)
        return AuthPayload(token=result.token, username=result)

@strawberry.type
class AccountQuery:
    # Ambil semua user
    users: List[UserType] = strawberry.field(resolver=get_users)
    user_by_id: Optional[UserType] = strawberry.field(resolver=get_user_by_id)
    user_by_username: Optional[UserType] = strawberry.field(resolver=get_user_by_username)


@strawberry.type
class AccountMutation:
    # Buat user baru
    create_user: UserType = strawberry.mutation(resolver=create_user)
    update_user: UserType = strawberry.mutation(resolver=update_user)
    delete_user: bool = strawberry.mutation(resolver=delete_user)

