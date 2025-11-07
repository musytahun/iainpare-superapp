# apps/lppm/models/dokumen.py
from django.db import models
from apps.references.models import Tahun

class Dokumen(models.Model):

    status_choices = [
        ('Tersedia', 'Tersedia'),
        ('Dalam Proses', 'Dalam Proses'),
        ('Belum Ada', 'Belum Ada'),
    ]
    
    name = models.CharField(max_length=150)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    kriteria_terkait = models.CharField(max_length=150, blank=True, null=True)
    status = models.CharField(max_length=150, choices=status_choices, blank=True, null=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True)
    link = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"