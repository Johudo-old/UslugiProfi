from django.contrib import admin
from dimension.models import DimensionModel


@admin.register(DimensionModel)
class DimensionAdmin(admin.ModelAdmin):
    list_display = ['name', 'short_name']
    fields = ['name', 'short_name']
    pass
