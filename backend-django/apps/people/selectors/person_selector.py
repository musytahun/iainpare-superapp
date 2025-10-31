# apps/people/selectors/person_selector.py
from apps.people.models import Person

def get_person():
    return Person.objects.all()

def get_person_by_id(people_id: int):
    return Person.objects.get(id=people_id)
