from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Lot
from .serializers import LotSerializer

@api_view(["GET"])
def getRoutes(request):
    routes=[
        "lots/",
        "lots/<str:pk>/",
    ]
    return Response(routes)

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
