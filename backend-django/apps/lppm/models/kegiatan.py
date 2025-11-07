# apps/lppm/models/kegiatan.py
from django.db import models
from apps.references.models import Tahun, Position

class Kegiatan(models.Model):

    status_choices = [
        ('Terjadwal', 'Terjadwal'),
        ('Terlaksana', 'Terlaksana'),
        ('Dibatalkan', 'Dibatalkan'),
    ]

    name = models.CharField(max_length=150)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    tanggal = models.DateField(null=True, blank=True)
    tempat = models.CharField(max_length=150, blank=True, null=True)
    status = models.CharField(max_length=150, choices=status_choices, blank=True, null=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True)
    link = models.CharField(max_length=150, blank=True, null=True)
    penanggung_jawab = models.ForeignKey(Position, related_name="pengabdian_pj", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"