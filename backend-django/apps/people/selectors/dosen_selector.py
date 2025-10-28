# apps/people/selectors/dosen_selector.py
from apps.people.models import Dosen

def get_dosen():
    return Dosen.objects.all()

def get_dosen_by_id(dosen_id: int):
    return Dosen.objects.get(id=dosen_id)
