from django.urls import path
from polls.views import product_views as views

urlpatterns = [
    
    path('', views.productsFunc, name='products'),
    path('create/', views.createProductFunc, name='productCreate'),
    path('upload/', views.uploadImageFunc, name='uploadImage'),
    path('top/', views.getTopProducts, name='top-products'), 
    path('<str:num>/', views.singleProductFunc, name='product'), 
    path('<str:num>/reviews', views.createProductReview, name='create-review'),   
    path('update/<str:num>/', views.updateProductFunc, name='productUpdate'),
    path('delete/<str:num>/', views.deleteProductFunc, name='productDelete'),
]