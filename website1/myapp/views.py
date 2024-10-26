from django.shortcuts import render
from .models import Chocolate

def index(request):
    return render(request, 'index.html')

# def order_view(request):
#     return render(request, 'order.html')

def order_page(request):
    chocolates = Chocolate.objects.all()  # Retrieve all chocolates from MongoDB
    if chocolates:
        print("Data retrieved successfully")
    else:
        print("No data found")
    return render(request, 'order.html', {'chocolates': chocolates})
