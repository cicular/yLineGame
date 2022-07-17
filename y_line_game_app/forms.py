from django import forms


class ThemeInfo(forms.Form):
    theme_title = forms.CharField(label='お題のタイトル', max_length=40)
    theme_contents = forms.CharField(label='お題の内容',
                                     max_length=30000,
                                     widget=forms.Textarea(attrs={'class': 'content', 'cols': '80', 'rows': '10'}),
                                     )
