from django.urls import path
from . import views
from rest_framework import routers
from django.urls import include
from . import apis

app_name = 'y_line_game_app'

# router = routers.DefaultRouter()
# router.register(r'theme', views.ThemeViewSet, "theme")

router = routers.SimpleRouter()
router.register('theme2222', views.AAA, 'theme2222')

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
    # ()を書かないと、but 2 were givenエラーになる。
    path('theme', views.ThemeViewSet.as_view(), name='theme'),
    # path('theme', views.theme_list, name='theme')
    path('themeDetail/<int:pk>', views.ThemeViewSetDetail.as_view(), name='themeDetail'),
    # https://tech-blog.rakus.co.jp/entry/20220329/python#2ViewSets
    path('', include(router.urls)),
    # router.urls
]
