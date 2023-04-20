from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name="routes"),
    path('lots/', views.getLots, name="lots"),
    path('lots/<str:pk>/', views.getLot, name="lot"),
]