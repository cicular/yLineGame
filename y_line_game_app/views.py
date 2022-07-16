from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


# def index(request):
#     return HttpResponse('<h1>hello</h1>')

def index(request):
    val = 'Hello World!!'
    return render(request, 'index.html', context={'value': val})
