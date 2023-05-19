from django.urls import path
from base.views import user_views as views

urlpatterns = [
    
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register' ),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('lots/', views.getUserLots, name="user-lots"),
    path('<str:pk>/', views.getSingleUserProfile, name="single-user-profile"),
    path('', views.getUsers, name="users"),
    
]