from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('order.html', TemplateView.as_view(template_name='order.html'), name='order_html'),
    path('', include('myapp.urls')),
]
