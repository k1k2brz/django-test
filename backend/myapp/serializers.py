from rest_framework import serializers
from .models import Item

# Serializer: 일반적으로 데이터를 Python 객체에서 JSON과 같은 다른 형식으로 변환하거나, JSON 등의 형식에서 Python 객체로 역직렬화 함
# ex) 클라이언트가 POST 요청으로 아이템 추가를 요청하면, add_item 뷰에서 ItemSerializer를 사용해 요청 데이터를 Python 객체로 변환한 후, 데이터베이스에 저장한다.
class ItemSerializer(serializers.ModelSerializer):
    class Meta: #  직렬화 대상 모델과 직렬화할 필드를 지정
        model = Item
        fields = '__all__'
        read_only_fields = ['user']
