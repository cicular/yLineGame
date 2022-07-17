from django.shortcuts import render
from django.http import HttpResponse
from . import forms

# Create your views here.


# def index(request):
#     return HttpResponse('<h1>hello</h1>')

def index(request):
    val = 'Hello World!!'
    return render(request, 'index.html', context={'value': val})


def home(request, first_name, last_name):
    my_name = f'{first_name}{last_name}'
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


# お題の登録
def index2(request):
    return render(request, 'index2.html')


def register_theme(request):
    form = forms.ThemeInfo()
    return render(request, 'register_theme.html', context={
        'form': form
    })
