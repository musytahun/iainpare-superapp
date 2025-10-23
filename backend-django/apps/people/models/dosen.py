# apps/people/models/dosen.py
from django.db import models
from .person import Person
from apps.references.models import JabatanFungsional, PangkatGolongan, ProgramStudi, BidangKepakaran

class Dosen(models.Model):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    nidn = models.CharField(max_length=20, unique=True, blank=True, null=True)
    nip = models.CharField(max_length=20, unique=True, blank=True, null=True)
    gelar_depan = models.CharField(max_length=20, blank=True, null=True)
    gelar_belakang = models.CharField(max_length=20, blank=True, null=True)
    jabatan_fungsional = models.ForeignKey(JabatanFungsional, on_delete=models.SET_NULL, null=True)
    pangkat_golongan = models.ForeignKey(PangkatGolongan, on_delete=models.SET_NULL, null=True)
    program_studi = models.ForeignKey(ProgramStudi, on_delete=models.SET_NULL, null=True)
    bidang_kepakaran = models.ForeignKey(BidangKepakaran, on_delete=models.SET_NULL, null=True)
