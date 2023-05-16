from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Lot, Bid
from ..serializers import BidSerializer

from rest_framework import status
from django.utils import timezone

from decimal import Decimal

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createBid(request, pk):
    user = request.user
    data = request.data

    try:
        lot = Lot.objects.get(id=pk)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)

    price = Decimal(data.get('price'))
    if price is None:
        return Response({"message": "Price field is required."}, status.HTTP_400_BAD_REQUEST)

    current_price = lot.current_price
    initial_price = lot.initial_price
    if price <= current_price or price <= initial_price:
        return Response({"message": "Bid price must be higher than the current price or inistial price."},
                        status.HTTP_400_BAD_REQUEST)

    try:
        bid = Bid.objects.create(
            lot_id=lot,
            bidder_id=user,
            time=timezone.now(),
            price=price
        )
        bid.save()

        # update the current price of the lot
        lot.current_price = price
        lot.save()

        return Response({"message": "Bid was made successfully!"})
    except KeyError as e:
        return Response({"message": f"Missing required field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getLotBids(request, pk):
    try:
        lot = Lot.objects.get(id=pk)
        bids = Bid.objects.filter(lot_id=lot)

        if bids:
            serializer = BidSerializer(bids, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "No bids found for this lot."}, status.HTTP_404_NOT_FOUND)

    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getLastBid(request, pk):
    try:
        lot = Lot.objects.get(id=pk)
        last_bid = Bid.objects.filter(lot_id=lot).order_by('price').last()

        if last_bid:
            serializer = BidSerializer(last_bid)
            return Response(serializer.data)
        else:
            return Response({"message": "No bids found for this lot."}, status.HTTP_404_NOT_FOUND)

    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getLotBidsCount(request, pk):
    try:
        lot = Lot.objects.get(id=pk)
        bid_num = Bid.objects.filter(lot_id=lot).count()
        bid_num -= 1
        return  Response(bid_num)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)