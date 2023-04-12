from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('lots/', views.getLots, name="lots"),
    path('lots/<str:pk>/', views.getLot, name="lot"),
]