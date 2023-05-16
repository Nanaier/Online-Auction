from django.urls import path
from base.views import balance_views as views

urlpatterns = [
    path('replenish/', views.replenishBalance, name="replenishment"),
    path('withdraw/', views.withdrawBalance, name="withdrawal"),
]