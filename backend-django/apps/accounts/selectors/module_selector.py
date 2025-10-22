# apps/accounts/selectors/module_selector.py
from apps.accounts.models import Module


def get_modules():
    return Module.objects.all().order_by("name")

def get_module_by_id(*, id: int):
    return Module.objects.filter(pk=id).first()