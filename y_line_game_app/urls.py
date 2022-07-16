from django.urls import path
from . import views


app_name = 'y_line_game_app'


urlpatterns = [
    # 127.0.0.1:8000/y_line_game_app/hello
    path('hello', views.index, name='index'),
    # http://127.0.0.1:8000/y_line_game_app/home
    path('home', views.home, name='home'),
]
