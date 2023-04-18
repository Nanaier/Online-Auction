from django.contrib import admin
from .models import Lot, Favourites, User, Bid, Notification
# Register your models here.

admin.site.register(Lot)
admin.site.register(Favourites)
admin.site.register(User)
admin.site.register(Bid)
admin.site.register(Notification)