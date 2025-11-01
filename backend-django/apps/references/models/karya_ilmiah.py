# apps/references/models/karya_ilmiah.py
from django.db import models

class KaryaIlmiah(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}"