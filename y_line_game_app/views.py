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


def filter_test(request):
    name = 'ichiro yamada'
    height = 175
    weight = 60
    bmi = weight / (height / 100)**2
    page_url = 'ホームページ: https://www.google.co.jp/'
    favorite_fruits = ['A', 'B', 'C']
    msg2 = 1234567890

    return render(request, 'filter_test.html', context={
        'name': name,
        'bmi': bmi,
        'page_url': page_url,
        'fruits': favorite_fruits,
        'msg2': msg2
    })
