# apps/references/models/strategic_goal.py
from django.db import models

class StrategicGoal(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)

    # Tambahan multi-renstra
    is_active = models.BooleanField(default=True)
    year_start = models.PositiveIntegerField(blank=True, null=True)
    year_end = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"