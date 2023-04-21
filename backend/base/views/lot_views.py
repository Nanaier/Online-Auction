from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Lot
from base.serializers import LotSerializer

from rest_framework import status

@api_view(["GET"])
def getLots(request):
    lots = Lot.objects.all()
    serializer = LotSerializer(lots, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getLot(request, pk):
    lot = Lot.objects.get(id=pk)
    serializer = LotSerializer(lot, many=False)
    return Response(serializer.data)

