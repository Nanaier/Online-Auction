from django.urls import path
from base.views import lot_views as views

urlpatterns = [
    path('', views.getLots, name="lots"),
    path('<str:pk>/', views.getLot, name="lot"),
    
]