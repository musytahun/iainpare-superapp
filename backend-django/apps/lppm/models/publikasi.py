# apps/lppm/models/publikasi.py
from django.db import models
from apps.people.models import Person
from apps.references.models import Tahun, Indeksasi, Penerbit, KelompokKeilmuan, KaryaIlmiah

class Publikasi(models.Model):
    judul = models.CharField(max_length=150)
    ketua = models.ForeignKey(Person, related_name="publikasi_dipimpin", on_delete=models.SET_NULL, null=True, blank=True)
    anggota = models.ManyToManyField(Person, related_name="publikasi_diikuti", blank=True)
    keterangan = models.CharField(max_length=150, blank=True, null=True)
    kelompok_keilmuan = models.ForeignKey(KelompokKeilmuan, on_delete=models.SET_NULL, null=True, blank=True)
    indeksasi = models.ForeignKey(Indeksasi, on_delete=models.SET_NULL, null=True)
    penerbit = models.ForeignKey(Penerbit, on_delete=models.SET_NULL, null=True)
    no_regis = models.CharField(max_length=150, blank=True, null=True)
    tahun = models.ForeignKey(Tahun, on_delete=models.SET_NULL, null=True)
    link = models.CharField(max_length=150, blank=True, null=True)
    karya_ilmiah = models.ForeignKey(KaryaIlmiah, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.judul}"