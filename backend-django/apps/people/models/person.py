# apps/people/models/person.py
from django.db import models

class Person(models.Model):
    nama = models.CharField(max_length=150)
    email = models.EmailField(unique=True, blank=True, null=True)
    nomor_hp = models.CharField(max_length=20, blank=True, null=True)
    alamat = models.TextField(blank=True, null=True)
    foto_profil = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nama
