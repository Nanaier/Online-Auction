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
        return Response({"message":"Lot was created successfully!"})
    except KeyError as e:
        return Response({"message":f"Missing required field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteLot(request, pk):
    try:
        lot = Lot.objects.get(id=pk)
        if lot.auctioneer_id != request.user:
             return Response({"message": "You are not authorized to delete this item."}, status.HTTP_403_FORBIDDEN)
        if lot.image:
            lot.image.delete()
        lot.delete()
        return Response({"message":"Lot was deleted successfully!"}, status.HTTP_204_NO_CONTENT)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)
    
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateLot(request, pk):
    user = request.user
    data = request.data
    try:
        lot = Lot.objects.get(id=pk)
        if lot.auctioneer_id != user:
             return Response({"message": "You are not authorized to update this item."}, status.HTTP_403_FORBIDDEN)
        lot.name = data['name']
        lot.initial_price = data['initial_price']
        lot.status = data['status']
            # if image already exist we should delete it from static/images folder
        if lot.image:
            lot.image.delete()
            # checking if optional fields are present, if they are not present, change to None
        if 'image' in request.FILES:
            image = request.FILES["image"]
            lot.image = image
        else:
            lot.image = None
        if 'bidding_start_time' in data:
            lot.bidding_start_time = data['bidding_start_time']
        else:
            lot.bidding_start_time = None
        if 'bidding_end_time' in data:
            lot.bidding_end_time = data['bidding_end_time']
        else:
            lot.bidding_end_time = None
        if 'description' in data:
            lot.description = data['description']
        else:
            lot.description = None
        lot.save()
        return Response({"message":"Lot was updated successfully!"},  status.HTTP_204_NO_CONTENT)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)
    except KeyError as e:
        return Response({"message":f"Missing required field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)