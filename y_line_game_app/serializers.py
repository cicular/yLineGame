from rest_framework import serializers
from .models import Theme


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        # fields = '__all__'
        # field = ["theme_id", "theme_title"]
        fields = (
            "theme_id", "theme_title"
        )
