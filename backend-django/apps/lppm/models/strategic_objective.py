# apps/references/models/strategic_objective.py
from django.db import models
from .strategic_goal import StrategicGoal

class StrategicObjective(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    strategic_goal = models.ForeignKey(StrategicGoal, on_delete=models.CASCADE, related_name="objectives")

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"