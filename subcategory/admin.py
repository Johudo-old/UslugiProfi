from subcategory.models import SubategoryModel
from django.contrib import admin


@admin.register(SubategoryModel)
class SubategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category_id', 'is_active', 'create_date']
    fields = ['name', 'category_id', 'is_active']
    pass
