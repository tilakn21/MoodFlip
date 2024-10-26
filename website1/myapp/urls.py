from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('order/', views.order_page, name='order'),
    # path('order/', views.order_view, name='order'),
    # Add other URL patterns as needed
]
