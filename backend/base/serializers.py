from rest_framework import serializers
from .models import *


class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = '__all__'


class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
