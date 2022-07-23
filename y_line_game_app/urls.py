from django.urls import path
from . import views
from rest_framework import routers
from . import apis

app_name = 'y_line_game_app'

# router = routers.DefaultRouter()
# router.register(r'theme', views.ThemeViewSet, "theme")

urlpatterns = [
    # 127.0.0.1:8000/y_line_game_app/hello
    path('hello', views.index, name='index'),
    # http://127.0.0.1:8000/y_line_game_app/home
    path('home/<first_name>/<last_name>', views.home, name='home'),
    # http://127.0.0.1:8000/y_line_game_app/filter
    path('filter', views.filter_test),
    # http://127.0.0.1:8000/y_line_game_app/form_theme
    path('form_theme', views.form_theme, name='form_theme'),
    path('index2', views.index2, name='index2'),
    # path('theme', views.ThemeViewSet.as_view, name='theme')
    path('theme', apis.Api.as_view(), name='theme')
]
