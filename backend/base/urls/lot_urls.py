from django.urls import path
from ..views import lot_views as views

urlpatterns = [
    path('', views.getLots, name="lots"),
    path('create/', views.createLot, name="createLot"),
    path('<str:pk>/delete/', views.deleteLot, name="deleteLot"),
    path('<str:pk>/update/', views.updateLot, name="updateLot"),
    path('<str:pk>/favourite/', views.favouriteLot, name="favouriteLot"),
    path('<str:pk>/isFavourite/', views.isFavouriteLot, name="isFavouriteLot"),
    path('<str:pk>/', views.getLot, name="lot"),

    path('<str:pk>/bids/create/', views.createBid, name="createBid"),
    path('<str:pk>/bids/', views.getLotBids, name="lotBids"),
    path('<str:pk>/bids/last/', views.getLastBid, name="lastBid"),
]
