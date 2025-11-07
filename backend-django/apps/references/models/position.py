# apps/references/models/position.py
from django.db import models

class Position(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="subordinates"
    )
    level = models.PositiveIntegerField(blank=True, null=True, help_text="Level hierarki jabatan (1=tertinggi(cth: rektor))")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"