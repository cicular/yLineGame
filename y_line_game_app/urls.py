from django.urls import path
from . import views


app_name = 'y_line_game_app'


urlpatterns = [
    path('hello', views.index, name='index'),
]
