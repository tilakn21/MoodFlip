from django.shortcuts import render
from django.http import HttpResponseServerError
from .models import Chocolate

def index(request):
    return render(request, 'index.html')

# def order_view(request):
#     return render(request, 'order.html')

def order_page(request):
    try:
        chocolates = Chocolate.objects.all()
        print("Chocolates:", list(chocolates))
    except Exception as e:
        print("DB ERROR:", e)
        return HttpResponseServerError("Database connection error: " + str(e))
    return render(request, 'order.html', {'chocolates': chocolates})
