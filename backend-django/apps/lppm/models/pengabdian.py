# apps/lppm/models/pengabdian.py
from django.db import models
from apps.people.models import Person
from apps.references.models import Tahun, KabupatenKota

class Pengabdian(models.Model):
    judul = models.CharField(max_length=150)
    pengabdi = models.ManyToManyField(Person, related_name="pengabdian", blank=True)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    lokasi = models.ForeignKey(KabupatenKota, on_delete=models.SET_NULL, null=True)
    jumlah_dana = models.DecimalField(max_digits=11, decimal_places=0, blank=True, null=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.judul}"