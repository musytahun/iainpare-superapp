# apps/lppm/models/penelitian.py
from django.db import models
from apps.people.models import Person
from apps.references.models import SumberDana, KelompokRiset, JenisKolaborasi, Tahun

class Penelitian(models.Model):
    judul = models.CharField(max_length=255)
    ketua_peneliti = models.ForeignKey(Person, related_name="penelitian_dipimpin", on_delete=models.SET_NULL, null=True, blank=True)
    anggota_peneliti = models.ManyToManyField(Person, related_name="penelitian_diikuti", blank=True, null=True)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    jumlah_dana = models.DecimalField(max_digits=11, decimal_places=0, blank=True, null=True)
    sumber_dana = models.ForeignKey(SumberDana, on_delete=models.SET_NULL, null=True, blank=True)
    kelompok_riset = models.ForeignKey(KelompokRiset, on_delete=models.SET_NULL, null=True, blank=True)
    jenis_kolaborasi = models.ForeignKey(JenisKolaborasi, on_delete=models.SET_NULL, null=True, blank=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.judul}"