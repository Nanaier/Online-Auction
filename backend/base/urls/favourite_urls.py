from django.urls import path
from base.views import favourite_views as views

urlpatterns = [
    path('', views.getFavourites, name="favourites"),
]