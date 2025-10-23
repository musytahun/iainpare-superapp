# apps/references/models/kabupaten_kota.py
from django.db import models
from .provinsi import Provinsi

class KabupatenKota(models.Model):
    code = models.CharField(max_length=100, unique=True)
    nama = models.CharField(max_length=150)
    provinsi = models.ForeignKey(Provinsi, on_delete=models.PROTECT)

    def __str__(self):
        return self.nama
