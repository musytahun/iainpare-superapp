# apps/people/models/mahasiswa.py
from django.db import models
from .person import Person
from apps.references.models import ProgramStudi

class Mahasiswa(models.Model):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    nim = models.CharField(max_length=20, unique=True)
    angkatan = models.IntegerField()
    program_studi = models.ForeignKey(ProgramStudi, on_delete=models.SET_NULL, null=True, blank=True)
