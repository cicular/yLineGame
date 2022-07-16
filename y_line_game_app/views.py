from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


# def index(request):
#     return HttpResponse('<h1>hello</h1>')

def index(request):
    val = 'Hello World!!'
    return render(request, 'index.html', context={'value': val})


def home(request):
    my_name = 'Test Taro'
    favorite_fruits = ['A', 'B', 'C']
    my_info = {
        'name': 'Taro',
        'age': 25
    }
    return render(request, 'home.html', context={
        'my_name': my_name,
        'favorite_fruits': favorite_fruits,
        'my_info': my_info
    })
