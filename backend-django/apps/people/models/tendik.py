# apps/people/models/tendik.py
from django.db import models
from .person import Person
from apps.references.models import PangkatGolongan

class Tendik(models.Model):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    nip = models.CharField(max_length=20, unique=True, blank=True, null=True)
    pangkat_golongan = models.ForeignKey(PangkatGolongan, on_delete=models.SET_NULL, null=True)
