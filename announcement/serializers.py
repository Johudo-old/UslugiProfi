from announcement.models import AnnouncementModel
from UslugiProfi.utils import create_file_absolute_url
from rest_framework import serializers


class GetAnnouncementsSeriaizer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = AnnouncementModel
        fields = ('id', 'name', 'description', 'subcategory', 'user', 'address', 'address_lat', 'address_lng', 'create_date',
                  'update_time', 'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency', 'dimension', 'image', 'is_active')

    def get_image(self, announcement):
        request = self.context.get('request')
        return create_file_absolute_url(request=request, file=announcement.image)
