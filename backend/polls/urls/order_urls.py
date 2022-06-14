from django.urls import path
from polls.views import orders_views as views

urlpatterns = [
   path('',views.getOrders, name='orders'),
   path('add/', views.addOrderItems, name='order-add'),
   path('myOrders/',views.getMyOrders, name='myorders'),
   path('<str:num>/shipped/', views.updateOrderToShipped, name='order-shipped'),
   path('<str:num>/delivered/', views.updateOrderToDelivered, name='order-delivered'),
   path('<str:pk>/', views.getOrderById, name='order-get'),
   path('<str:pk>/pay/', views.updateOrderToPaid, name='order-paid'),

]