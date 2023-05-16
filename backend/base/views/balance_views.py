import decimal
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# from base.models import User
from ..models import User

from rest_framework import status

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def replenishBalance(request):
    sum = request.GET.get('sum', '')
    if sum != '':
        try:
            user = request.user
            user.balance += decimal.Decimal(sum)
            user.save()
            return Response({
                "balance": user.balance,
                "message": "Successfull replenishment"}, status.HTTP_200_OK)
        except decimal.InvalidOperation as e:
            return Response({"message": "Data in a wrong format!"}, status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Replenishment sum has not been specified!"}, status.HTTP_400_BAD_REQUEST)
    
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def withdrawBalance(request):
    sum = request.GET.get('sum', '')
    if sum != '':
        try:
            user = request.user
            user.balance -= decimal.Decimal(sum)
            user.save()
            return Response({
                "balance": user.balance,
                "message": "Successfull withdrawal"}, status.HTTP_200_OK)
        except decimal.InvalidOperation as e:
            return Response({"message": "Data in a wrong format!"}, status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Withdrawal sum has not been specified!"}, status.HTTP_400_BAD_REQUEST)