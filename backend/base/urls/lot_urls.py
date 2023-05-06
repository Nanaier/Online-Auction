from django.urls import path
from base.views import lot_views as views

urlpatterns = [
    path('', views.getLots, name="lots"),
    path('create/', views.createLot, name="createLot"),
    path('<str:pk>/delete/', views.deleteLot, name="deleteLot"),
    path('<str:pk>/update/', views.updateLot, name="updateLot"),
    path('<str:pk>/favourite/', views.favouriteLot, name="favouriteLot"),
    path('<str:pk>/', views.getLot, name="lot"),
]