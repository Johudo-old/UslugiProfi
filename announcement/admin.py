from announcement.models import AnnouncementModel
from django.contrib import admin


@admin.register(AnnouncementModel)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'subcategory', 'user', 'address', 'address_lat', 'address_lng', 'create_date',
                    'update_time', 'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency', 'dimension', 'image', 'is_active']
    fields = ['name', 'description', 'subcategory', 'user', 'address', 'address_lat', 'address_lng',
              'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency', 'dimension', 'image', 'is_active']
    pass
