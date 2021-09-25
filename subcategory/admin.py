from subcategory.models import SubcategoryModel
from django.contrib import admin


@admin.register(SubcategoryModel)
class SubategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_active', 'create_date']
    fields = ['name', 'category', 'is_active']
    pass
