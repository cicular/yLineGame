from django.db import models

# Create your models here.
from django.utils import timezone

# python manage.py makemigrations y_line_game_app --name add_theme
# python manage.py makemigrations y_line_game_app --name add_user
# python manage.py migrate y_line_game_app


class Theme(models.Model):
    # 一意に割り振られるID
    theme_id = models.AutoField(primary_key=True)
    # お題の題名
    theme_title = models.CharField(max_length=200)
    # お題の内容
    # PostgreSQLの最大文字数は1GB（=10485760）。
    theme_contents = models.TextField()
    # 入力された値
    entered_contents = models.TextField(default="", null=True)
    # 登録者
    user_id = models.IntegerField()
    # 入力された正解値の数
    num_of_entered_contents = models.IntegerField(default=0)
    # 残りの数
    num_of_remaining_contents = models.IntegerField(null=True, default=0)
    # 不正解数
    num_of_incorrect = models.IntegerField(default=0)
    # プレイ時間
    play_time = models.DateTimeField(null=True)
    # お題の登録日時
    registration_time = models.DateTimeField(default=timezone.datetime.now)
    # お題の更新日時
    update_time = models.DateTimeField(null=True)
    # 最終プレイ時間
    last_play_time = models.DateTimeField(null=True)
    # プレイ回数
    num_of_plays = models.IntegerField(default=0)
    # お題内容の数
    num_of_contents = models.IntegerField()
    # 最高記録
    best_record = models.IntegerField(null=True, default=0)
    # 公開フラグ
    public_flg = models.CharField(max_length=1, default=0)
    # 削除フラグ
    delete_flg = models.CharField(max_length=1, default=0)


class User(models.Model):
    # 一意に割り振られるID
    user_id = models.AutoField(primary_key=True)
    # パスワード
    password = models.CharField(max_length=20)
    # ログインフラグ
    login_flg = models.CharField(max_length=1, default=0)
    # 登録日時
    registration_time = models.DateTimeField(default=timezone.datetime.now)
    # 更新日時
    update_time = models.DateTimeField(null=True)
    # 削除フラグ
    delete_flg = models.CharField(max_length=1, default=0)
