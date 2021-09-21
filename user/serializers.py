from rest_framework import serializers
from user.models import UserModel


class CurrentUserSeriaizer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'type', 'name', 'surname', 'company', 'ogrn', 'inn',
                  'address', 'country', 'create_date', 'phone', 'is_email_confirmed', 'avatar')

    def get_avatar(self, user):
        request = self.context.get('request')
        if user.avatar and hasattr(user.avatar, 'url'):
            photo_url = user.avatar.url
            return request.build_absolute_uri(photo_url)
        else:
            return None
