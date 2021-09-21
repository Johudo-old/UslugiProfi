from announcement.models import AnnouncementDimensionModel, AnnouncementModel, PriceCurrencyModel
from django.contrib import admin


@admin.register(PriceCurrencyModel)
class PriceCurrencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name']
    fields = ['name', 'short_name']
    pass


@admin.register(AnnouncementDimensionModel)
class AnnouncementDimensionAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name']
    fields = ['name', 'short_name']
    pass


@admin.register(AnnouncementModel)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'subcategory_id', 'user_id', 'address', 'address_lat', 'address_lng', 'create_date',
                    'update_time', 'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency_id', 'dimension_id', 'image', 'is_active']
    fields = ['name', 'description', 'subcategory_id', 'user_id', 'address', 'address_lat', 'address_lng',
              'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency_id', 'dimension_id', 'image', 'is_active']
    pass
