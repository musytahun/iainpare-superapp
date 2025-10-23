# apps/references/models/tahun_kegiatan.py
from django.db import models

class TahunKegiatan(models.Model):
    tahun = models.PositiveIntegerField(unique=True)
    aktif = models.BooleanField(default=False)

    def __str__(self):
        return str(self.tahun)
