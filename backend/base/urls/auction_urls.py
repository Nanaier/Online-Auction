from django.urls import path
from base.views import auction_views as views

urlpatterns = [
    path('<str:pk>/end-bidding/', views.endBidding, name="end-bidding"),
]