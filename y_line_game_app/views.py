from django.shortcuts import render
from django.http import HttpResponse
from . import forms
from rest_framework import viewsets
from .serializers import ThemeSerializer
from .models import Theme

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


# def register_theme(request):
#     form = forms.ThemeInfo()
#     if request.method == 'POST':
#         # Formで送られた値を取り出す
#         form = forms.ThemeInfo(request.POST)
#         if form.is_valid():
#             print('バリデーション成功')
#             print(f'title: {form.cleaned_data["theme_title"]}, contents: {form.cleaned_data["theme_contents"]}')
#     return render(request, 'register_theme.html', context={
#         'form': form
#     })


def form_theme(request):
    form = forms.ThemeModelForm()
    if request.method == 'POST':
        form = forms.ThemeModelForm(request.POST)
        if form.is_valid():
            form.save()
    return render(request, 'register_theme.html', context={
        'form': form
    })


class ThemeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ThemeSerializer
    # 警告が消えないが、動作はするので一旦放置とする。
    # queryset = Theme.objects.all()
