## ■ サービス概要
ひとりで山手線ゲームをすることで楽しく暗記できるWebアプリです。

## ■ 起動手順
<!-- Django起動 -->
cd C:\Users\ユーザ名\PycharmProjects\yamanoteLineGameProject
pj_env/Scripts/activate
cd .\yLineGameProject\
python .\manage.py runserver

<!-- React起動 -->
cd C:\Users\ユーザ名\PycharmProjects\yamanoteLineGameProject\yLineGameProject\y_line_react_app
npm start

## ■ 使用技術
#### バックエンド
- Python 3.8.8
- Django 3.1.2
- djangorestframework 3.13.1
- psycopg2 2.9.3（データベース接続）
- pip 20.2.3

#### フロントエンド
- HTML
- CSS
- JavaScript
- react 18.2.0
- react-dom 18.2.0
- react-router-dom 6.3.0（画面遷移）
- axios 0.27.2（HTTPクライアント）
- use-sound 4.0.1（音声再生）

#### データベース
- PostgreSQL 12.1

## ■ アプリURL
http://localhost:3000/login
