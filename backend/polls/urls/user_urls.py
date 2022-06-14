from django.urls import path
from polls.views import users_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.usersFunc, name='user-profile'),
    path('profile/update/', views.updateUserProfile, name='user-profile-update'),
    path('', views.getUsers, name='users'),
    path('register/', views.registerUser, name='register'),
    path('<str:num>/', views.getUserWithId, name='user'), 
    path('update/<str:num>/', views.updateUser, name='user-update'),
    path('delete/<str:num>/', views.deleteUser, name='user-delete'),
]