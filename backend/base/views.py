from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .lots import lots
# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    routes=[
        "lots/",
        "lots/<str:pk>/",
    ]
    return Response(routes)

@api_view(["GET"])
def getLots(request):
    return Response(lots)

@api_view(["GET"])
def getLot(request, pk):
    lot = None
    for i in lots:
        if i["id"] == int(pk):
            lot = i
            break

    return Response(lot)
