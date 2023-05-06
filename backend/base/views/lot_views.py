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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createLot(request):
    user = request.user
    # print(request.data) 
    data = request.data
    try:
        lot = Lot.objects.create(
            name = data['name'],
            initial_price = data['initial_price'],
            current_price = data['initial_price'], # setting current price to initial price
            auctioneer_id = user,
            status = data['status'],
        )
        if 'image' in request.FILES:
            image = request.FILES["image"]
            lot.image = image
        if 'bidding_start_time' in data:
            lot.bidding_start_time = data['bidding_start_time']
        if 'bidding_end_time' in data:
            lot.bidding_end_time = data['bidding_end_time']
        if 'description' in data:
            lot.description = data['description']
        lot.save()
        return Response("Lot was created successfully!")
    except KeyError as e:
        return Response(f"Missing required field: {str(e)}", status=status.HTTP_400_BAD_REQUEST)
