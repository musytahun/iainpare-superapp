import strawberry
from .models import User


@strawberry.django.type(User)
class UserType:
    id: strawberry.auto
    username: strawberry.auto
    email: strawberry.auto
    full_name: strawberry.auto
