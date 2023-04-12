from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Lot(models.Model):
    STATUS_CHOICES = [
        ('placed', 'Placed'),
        ('active', 'Active'),
        ('sold', 'Sold'),
    ]

    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, null = False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null = False)
    image = models.ImageField(null = True)
    description = models.TextField(null = True)
    is_favourite = models.BooleanField(default = False)
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null= True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default = 'placed')
