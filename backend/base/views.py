from django.shortcuts import render
from django.http import JsonResponse
from .lots import lots
# Create your views here.

def getRoutes(request):
    return JsonResponse("Hello", safe=False)

def getLots(request):
    return JsonResponse(lots, safe=False)
