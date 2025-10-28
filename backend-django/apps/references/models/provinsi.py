# apps/references/models/provinsi.py
from django.db import models

class Provinsi(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name
