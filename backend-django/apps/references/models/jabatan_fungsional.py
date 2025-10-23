# apps/references/models/jabatan_fungsional.py
from django.db import models

class JabatanFungsional(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}"