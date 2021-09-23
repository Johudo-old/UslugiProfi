from price_currency.models import PriceCurrencyModel
from django.contrib import admin


@admin.register(PriceCurrencyModel)
class PriceCurrencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name']
    fields = ['name', 'short_name']
    pass
