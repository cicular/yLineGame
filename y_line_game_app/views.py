from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response

from . import forms
from rest_framework import viewsets, status
from rest_framework import views
from .serializers import GetThemeSerializer, PostThemeSerializer, GetThemeSerializer2, PutThemeSerializer
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


def theme_list(request):
    serializer_class = GetThemeSerializer
    # 警告が消えないが、動作はするので一旦放置とする。
    queryset = Theme.objects.all()
    serializer = GetThemeSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)


# class ThemeViewSet(viewsets.ReadOnlyModelViewSet):
#     serializer_class = ThemeSerializer
#     # 警告が消えないが、動作はするので一旦放置とする。
#     # queryset = Theme.objects.all()


# https://www.ariseanalytics.com/activities/report/20210205/
class ThemeViewSet(views.APIView):
    # 新規作成
    def post(self, request, *args, **kwargs):
        print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
        print(request.data)
        # シリアライザオブジュエクトを作成
        serializer = PostThemeSerializer(data=request.data)
        # バリデーション
        serializer.is_valid(raise_exception=True)
        # モデルオブジェクトを登録
        serializer.save()
        # レスポンスオブジェクトを返す
        return JsonResponse(serializer.data)

    def get(self, request):
        # theme_id = request.query_params.get('themeId')
        # print(theme_id)
        # 警告が消えないが、動作はするので一旦放置とする。
        queryset = Theme.objects.all()
        serializer = GetThemeSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    # https://selfnote.work/20200525/programming/django-rest-framework-basic4/
    # 更新
    def put(self, request, pk):
        print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
        selected_theme = Theme.objects.get(theme_id=pk)
        # シリアライザオブジェクトを作成
        serializer = PutThemeSerializer(data=request.data)
        if serializer.is_valid():
            # モデルオブジェクトを登録
            serializer.save()
            # レスポンスオブジェクトを返す
            return JsonResponse(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# theme_idをキーとしてデータを取得したい。
# https://selfnote.work/20200525/programming/django-rest-framework-basic4/#URL%E3%83%87%E3%82%A3%E3%82%B9%E3%83%91%E3%83%83%E3%83%81%E3%83%A3%E3%81%AE%E5%A4%89%E6%9B%B4-2
class ThemeViewSetDetail(views.APIView):
    # def get_object(self, pk):
    #     try:
    #         return Theme.objects.get(pk=pk)
    #     except Theme.DoesNotExist:
    #         raise Theme

    def get(self, request, pk):
        print(pk)
        # {"theme_id": 1, "theme_title": "\u5c71\u624b\u7dda\u306e\u99c5", "theme_contents":
        # selected_theme = Theme.objects.get(theme_id__exact='1')
        # Got AttributeError when attempting to get a value for field `theme_title` on serializer `GetThemeSerializer2`.
        selected_theme = Theme.objects.get(theme_id=pk)
        serializer = GetThemeSerializer2(selected_theme)
        print("aaaaa")
        # print(JsonResponse(serializer.data))
        return JsonResponse(serializer.data, safe=False)

    # def put(self, request, pk):
    #     print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★２")
    #     # https://qiita.com/Gattaca/items/6cad505b92f69e415b2f を参考に.
    #     theme = self.get_object(pk)
    #     # シリアライザオブジェクトを作成
    #     serializer = PutThemeSerializer(theme, data=request.data)
    #     # のメソッドを実行した後でなければ validated_data 属性を参照することはできませんし、
    #     # validated_data を元にオブジェクトを生成する save メソッドも同様に呼び出すことはできません。
    #     if serializer.is_valid(raise_exception=True):
    #         # is_validでfalseになる。→APIViewを諦める。
    #         # モデルオブジェクトを登録
    #         serializer.save(theme_id=pk)
    #         # レスポンスオブジェクトを返す
    #         return JsonResponse(serializer.data)
    #     print("valid失敗")
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# https://tech-blog.rakus.co.jp/entry/20220329/python#2ViewSets
class AAA(viewsets.ModelViewSet):
    print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
    # シリアライザーを取得
    serializer_class = PostThemeSerializer
    # モデルのオブジェクトを取得
    queryset = Theme.objects.all()
