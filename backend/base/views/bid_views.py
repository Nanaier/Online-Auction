from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from collections import OrderedDict

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

        # Create an empty OrderedDict
        fictive_bid = OrderedDict()

        # Add key-value pairs to the OrderedDict
        fictive_bid["id"] = -1
        fictive_bid["time"] = str(lot.bidding_start_time)
        fictive_bid["price"] = str(lot.initial_price)
        fictive_bid["bidder_id"] = lot.auctioneer_id.id
        fictive_bid["lot_id"] = lot.id

        if bids:
            serializer = BidSerializer(bids, many=True)
            return Response([fictive_bid] + serializer.data)
        else:
            return Response([fictive_bid])

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
        return  Response(bid_num)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)