# apps/references/models/program_studi.py
from django.db import models
from .fakultas import Fakultas

class ProgramStudi(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    fakultas = models.ForeignKey(Fakultas, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"