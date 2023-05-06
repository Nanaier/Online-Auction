from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Lot, Favourites
from base.serializers import LotSerializer

from rest_framework import status

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getFavourites(request):
    user = request.user
    favourites = Favourites.objects.filter(user_id=user)
    lot_ids = favourites.values_list('lot_id', flat=True)
    lots = Lot.objects.filter(id__in=lot_ids)
    serializer = LotSerializer(lots, many=True)
    return Response(serializer.data)