from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Lot
from .serializers import LotSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
