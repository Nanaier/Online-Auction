from django.urls import path
from ..views import bid_views as views

urlpatterns = [
    path('<str:pk>/bids/create/', views.createBid, name="createBid"),
    path('<str:pk>/bids/', views.getLotBids, name="lotBids"),
    path('<str:pk>/bids/last/', views.getLastBid, name="lastBid"),
    path('<str:pk>/bids/count/', views.getLotBidsCount, name="lotBidsCount"),
]
