from rest_framework import fields
from user.models import UserModel
from rest_framework.serializers import ModelSerializer

available_fields = ('id', 'email', 'type', 'name', 'surname', 'company', 'ogrn', 'inn',
                    'address', 'country', 'create_date', 'phone', 'is_email_confirmed', 'avatar')


class CurrentUserSeriaizer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = available_fields
