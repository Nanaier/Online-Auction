from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    id = models.AutoField(primary_key=True, editable=False)
    phone_number = models.CharField(max_length=20, unique=True, null=True)
    balance = models.DecimalField(max_digits=15, decimal_places=3, default=0, null=False)

class Lot(models.Model):
    STATUS_CHOICES = [
        ('placed', 'Placed'),
        ('active', 'Active'),
        ('sold', 'Sold'),
    ]

    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, null=False)
    initial_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    current_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    image = models.ImageField(null=True, blank=True)
    auctioneer_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default='placed')
    bidding_start_time = models.DateTimeField(null=True, blank=True)
    bidding_end_time = models.DateTimeField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Favourites(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    lot_id = models.ForeignKey(Lot, on_delete=models.CASCADE, null=False)


class Bid(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    bidder_id = models.ForeignKey(User, on_delete=models.RESTRICT, null=False)
    lot_id = models.ForeignKey(Lot, on_delete=models.RESTRICT, null=False)
    time = models.DateTimeField(auto_now_add=True, null=False)
    price = models.DecimalField(max_digits=15, decimal_places=3, null=False)

    def __str__(self):
        return f'Bid #{self.id} by bidder #{self.bidder_id}] on lot #{self.lot_id} was made'


class Notification(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    lot_id = models.ForeignKey(Lot, on_delete=models.CASCADE, null=False)
    time = models.DateTimeField(auto_now_add=True, null=False)
    content = models.TextField(null=False)

    def __str__(self):
        return f"Notification #{self.id} on lot #{self.lot_id} - {self.time}"
