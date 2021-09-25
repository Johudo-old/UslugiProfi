from UslugiProfi.utils import create_file_absolute_url
from rest_framework import serializers
from user.models import UserModel


class CurrentUserSeriaizer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "type",
            "name",
            "surname",
            "company",
            "ogrn",
            "inn",
            "address",
            "create_date",
            "phone",
            "is_email_confirmed",
            "avatar",
        )

    def get_avatar(self, user):
        request = self.context.get("request")
        return create_file_absolute_url(request=request, file=user.avatar)


class UpdateCurrentUserSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "avatar",
            "type",
            "name",
            "surname",
            "company",
            "inn",
            "address",
            "phone",
        )
