from django.urls import path
from base.views import lot_views as views

urlpatterns = [
    path('', views.getLots, name="lots"),
    path('create/', views.createLot, name="createLot"),
    path('<str:pk>/delete/', views.deleteLot, name="deleteLot"),
    path('<str:pk>/', views.getLot, name="lot"),
]