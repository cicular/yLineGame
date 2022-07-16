import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yLineGameProject.settings')

from django import setup
setup()

from y_line_game_app.models import Theme

t = Theme(
    theme_title='山手線の駅',
    theme_contents='東京,有楽町,新橋,浜松町,田町,品川,大崎,五反田,目黒,恵比寿,渋谷,原宿,代々木,新宿,新大久保,高田馬場,目白,池袋,大塚,巣鴨,駒込,田端,西日暮里,日暮里,鶯谷,上野,御徒町,秋葉原,神田,高輪ゲートウェイ',
    user_id=1,
    num_of_plays=0,
    num_of_contents=30,
    public_flg='0',
    delete_flg='0'
)

t.save()
