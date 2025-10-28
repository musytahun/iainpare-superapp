# apps/lppm/models/penelitian.py
from django.db import models
from apps.people.models import Person
from apps.references.models import Tahun, SumberDana

class Penelitian(models.Model):
    judul = models.CharField(max_length=255)
    peneliti = models.ManyToManyField(Person, related_name="penelitian", blank=True)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    jumlah_dana = models.DecimalField(max_digits=11, decimal_places=0, blank=True, null=True)
    sumber_dana = models.ForeignKey(SumberDana, on_delete=models.SET_NULL, null=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.judul}"