from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Remove this line to avoid /order.html route collision
    # path('order.html', TemplateView.as_view(template_name='order.html'), name='order_html'),
    path('', include('myapp.urls')),
]
