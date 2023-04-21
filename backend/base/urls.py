from django.urls import path
from . import views

urlpatterns = [
    
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register' ),
    path('user/profile/', views.getUserProfile, name="user-profile"),
    path('users/', views.getUsers, name="users"),
    path('lots/', views.getLots, name="lots"),
    path('lots/<str:pk>/', views.getLot, name="lot"),
    
]