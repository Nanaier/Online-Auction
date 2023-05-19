from django.utils import timezone
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Lot, Bid, User

from rest_framework import status

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def endBidding(request, pk):
    user = request.user
    try:
        lot = Lot.objects.get(id=pk)
        if lot.status == 'sold':
            return Response({"message": "Lot has been already sold!"}, status.HTTP_400_BAD_REQUEST)  
        if lot.auctioneer_id != user:
            return Response({"message": "You are not authorized to end bidding process for this item."}, status.HTTP_403_FORBIDDEN)
        last_bid = Bid.objects.filter(lot_id=lot).order_by('price').last()
        # if there is a bid and it is not from the auctioneer
        if last_bid and last_bid.bidder_id != user:
            lot.status = 'sold'
            lot.bidding_end_time = timezone.now()
            lot.save()
            return Response({"message": "Auction finished for current lot"}, status.HTTP_200_OK)
        return Response({"message": "No bids for current lot to end bidding process!"}, status.HTTP_400_BAD_REQUEST)
    except Lot.DoesNotExist:
        return Response({"message": "Lot does not exist."}, status.HTTP_404_NOT_FOUND)