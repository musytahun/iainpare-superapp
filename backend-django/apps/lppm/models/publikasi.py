# apps/lppm/models/publikasi.py
from django.db import models
from apps.people.models import Person
from apps.references.models import TahunKegiatan, JenisPublikasi, Penerbit

class Publikasi(models.Model):
    judul = models.CharField(max_length=150)
    penulis = models.ManyToManyField(Person, related_name="publikasi", blank=True)
    jenis_publikasi = models.ForeignKey(JenisPublikasi, on_delete=models.SET_NULL, null=True)
    penerbit = models.ForeignKey(Penerbit, on_delete=models.SET_NULL, null=True)
    no_regis = models.CharField(max_length=150, blank=True, null=True)
    detail = models.CharField(max_length=150, blank=True, null=True)
    tahun_kegiatan = models.ForeignKey(TahunKegiatan, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.judul_publikasi}"