from django.urls import path
from . import views
from rest_framework import routers
from django.urls import include

app_name = 'y_line_game_app'

# ModelViewSetの書き方
router = routers.SimpleRouter()
router.register('theme2222', views.ThemeModelViewSet, 'theme2222')

urlpatterns = [
    # APIViewの場合は通常の書き方
    # ()を書かないと、but 2 were givenエラーになる。
    # path('theme/<int:user_id>', views.ThemeViewSet.as_view(), name='theme'),
    path('theme', views.ThemeViewSet.as_view(), name='theme'),
    # path('theme', views.theme_list, name='theme')
    path('themeDetail/<int:pk>', views.ThemeViewSetDetail.as_view(), name='themeDetail'),
    # https://tech-blog.rakus.co.jp/entry/20220329/python#2ViewSets
    path('', include(router.urls)),
    path('user/<int:pk>', views.UserAPIView.as_view(), name='userInfo'),
    # router.urls
]
