# apps/accounts/selectors/role_selector.py
from apps.accounts.models import User, Role


def get_roles():
    return Role.objects.all().order_by("name")


def get_role_by_id(*, id: int):
    return Role.objects.filter(pk=id).first()


def get_roles_for_module(user: User, module_id: int):
    """Ambil role user di modul tertentu"""
    return (
        Role.objects.filter(users=user, modules__id=module_id)
        .distinct()
        .order_by("name")
    )