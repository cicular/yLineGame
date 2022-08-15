from django.http import JsonResponse
from rest_framework.response import Response

from rest_framework import viewsets, status
from rest_framework import views
from .serializers import GetThemeSerializer, PostThemeSerializer, GetThemeSerializer2, PutThemeSerializer, \
    UserSerializer
from .models import Theme, User


# def theme_list(request):
#     serializer_class = GetThemeSerializer
#     # 警告が消えないが、動作はするので一旦放置とする。
#     queryset = Theme.objects.all()
#     serializer = GetThemeSerializer(queryset, many=True)
#     return JsonResponse(serializer.data, safe=False)


# https://www.ariseanalytics.com/activities/report/20210205/
class ThemeViewSet(views.APIView):
    # # 新規作成
    # def post(self, request, *args, **kwargs):
    #     # シリアライザオブジェクトを作成
    #     serializer = PostThemeSerializer(data=request.data)
    #     # バリデーション
    #     serializer.is_valid(raise_exception=True)
    #     # モデルオブジェクトを登録
    #     serializer.save()
    #     # レスポンスオブジェクトを返す
    #     return JsonResponse(serializer.data)

    # ユーザIDを条件としてお題を取得
    def get(self, request, user_id):
        # theme_id = request.query_params.get('themeId')
        # 警告が消えないが、動作はするので一旦放置とする。
        # queryset = Theme.objects.all()
        queryset = Theme.objects.filter(user_id=user_id)
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

    # 主キー指定で1レコードの情報を取得
    def get(self, request, pk):
        # {"theme_id": 1, "theme_title": "\u5c71\u624b\u7dda\u306e\u99c5", "theme_contents":
        # selected_theme = Theme.objects.get(theme_id__exact='1')
        # Got AttributeError when attempting to get a value for field `theme_title` on serializer `GetThemeSerializer2`.
        selected_theme = Theme.objects.get(theme_id=pk)
        serializer = GetThemeSerializer2(selected_theme)
        print("ThemeDetail取得")
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
class ThemeModelViewSet(viewsets.ModelViewSet):
    print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
    # シリアライザーを取得
    serializer_class = PostThemeSerializer
    # モデルのオブジェクトを取得
    queryset = Theme.objects.all()


# class UserModelViewSet(viewsets.ModelViewSet):
#     print("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
#     # シリアライザーを取得
#     serializer_class = UserSerializer
#     # モデルのオブジェクトを取得
#     queryset = User.objects.all()


class UserAPIView(views.APIView):
    # 主キー指定で1レコードの情報を取得
    def get(self, request, pk):
        selected_user = User.objects.get(user_id=pk)
        serializer = UserSerializer(selected_user)
        print("User取得")
        return JsonResponse(serializer.data, safe=False)

    # 更新
    def put(self, request, pk):
        user = User.objects.get(user_id=pk)
        # user = self.get_object(user_id=pk)
        # シリアライザオブジェクトを作成
        # serializer = UserSerializer(user, data=request.data)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            # モデルオブジェクトを登録
            serializer.save(user_id=pk)
            # レスポンスオブジェクトを返す
            print("ユーザテーブルを更新しました。")
            return JsonResponse(serializer.data)
        else:
            print("valid失敗")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
