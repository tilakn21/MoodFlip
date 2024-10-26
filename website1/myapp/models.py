# models.py
from djongo import models

class Chocolate(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    ImgUrl = models.URLField()

    class Meta:
        db_table = "Chocolates"  # Explicitly map to Chocolates collection
