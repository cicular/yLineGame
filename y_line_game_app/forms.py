from django import forms
from .models import Theme


# class ThemeInfo(forms.Form):
#     theme_title = forms.CharField(label='お題のタイトル', max_length=40)
#     theme_contents = forms.CharField(label='お題の内容',
#                                      max_length=30000,
#                                      widget=forms.Textarea(attrs={'class': 'content', 'cols': '80', 'rows': '10'}),
#                                      )


class ThemeModelForm(forms.ModelForm):
    theme_title = forms.CharField(label='お題のタイトル', max_length=40)
    theme_contents = forms.CharField(label='お題の内容',
                                     max_length=30000,
                                     widget=forms.Textarea(attrs={'class': 'content', 'cols': '80', 'rows': '10'}),
                                     )

    class Meta:
        model = Theme
        # 画面上にどのフィールドを表示するか
        # fields = '__all__'
        fields = ['theme_title', 'theme_contents']

    # オーバーライド
    def save(self, *args, **kwargs):
        print('オーバーライドしたsave')
        # commit=Falseとすることでこの段階では保存されない。
        obj = super(ThemeModelForm, self).save(commit=False)
        obj.user_id = 1
        obj.num_of_plays = 0
        obj.num_of_contents = 1
        obj.best_record = 0
        obj.public_flg = '0'
        obj.delete_flg = '0'

        print('save実行')
        print(obj.user_id)

        obj.save()
        return obj
