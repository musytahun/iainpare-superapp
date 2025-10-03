# apps/accounts/schema.py
import strawberry
from typing import Optional
from .types import UserType
from .services import create_user
from .selectors import get_user, get_user_by_username


@strawberry.type
class AccountQuery:
    # Ambil user by ID
    user: Optional[UserType] = strawberry.field(resolver=get_user)
    # Ambil user by username
    user_by_username: Optional[UserType] = strawberry.field(resolver=get_user_by_username)


@strawberry.type
class AccountMutation:
    # Buat user baru
    create_user: UserType = strawberry.mutation(resolver=create_user)


# query {
#   userByUsername(username: "john_doe") {
#     id
#     username
#     email
#     fullName
#   }
# }

# mutation {
#   createUser(username: "john_doe", password: "secret123", email: "john@example.com", fullName: "John Doe") {
#     id
#     username
#     email
#     fullName
#   }
# }
