# apps/references/models/bidang_kepakaran.py
from django.db import models

class BidangKepakaran(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}"