# apps/accounts/selectors/permission_selector.py
from apps.accounts.models import Permission


def get_permissions():
    return Permission.objects.all().order_by("code")


def get_permission_by_id(*, id: int):
    return Permission.objects.filter(pk=id).first()