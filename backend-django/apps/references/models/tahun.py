# apps/references/models/tahun.py
from django.db import models

class Tahun(models.Model):
    code = models.PositiveIntegerField(unique=True)
    name = models.PositiveIntegerField(blank=False, null=False)

    def __str__(self):
        return str(self.name)
