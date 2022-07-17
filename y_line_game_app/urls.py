from django.urls import path
from . import views


app_name = 'y_line_game_app'


urlpatterns = [
    # 127.0.0.1:8000/y_line_game_app/hello
    path('hello', views.index, name='index'),
    # http://127.0.0.1:8000/y_line_game_app/home
    path('home/<first_name>/<last_name>', views.home, name='home'),
    # http://127.0.0.1:8000/y_line_game_app/filter
    path('filter', views.filter_test),
    # http://127.0.0.1:8000/y_line_game_app/register_theme
    path('register_theme', views.register_theme, name='register_theme'),
    path('index2', views.index2, name='index2'),
]
