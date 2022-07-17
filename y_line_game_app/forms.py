from django import forms


class ThemeInfo(forms.Form):
    theme_title = forms.CharField()
    theme_contents = forms.CharField()
