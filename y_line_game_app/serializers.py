from rest_framework import serializers
from .models import Theme, User


# Modelクラスで定義しているフィールドをJSON文字列と変換するシリアライザとして利用する。
class GetThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        # field = ["theme_id", "theme_title"]
        fields = (
            "theme_id", "theme_title", "num_of_contents", "best_record"
        )


class PostThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'
        # field = ["theme_id", "theme_title"]
        # fields = (
        #     "theme_id", "theme_title"
        # )


class GetThemeSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'
        # field = ["theme_id", "theme_title"]
        # fields = (
        #     "theme_id", "theme_title"
        # )


class PutThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
