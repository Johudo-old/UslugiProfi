from category.models import CategoryModel
from django.contrib import admin


@admin.register(CategoryModel)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active',  'create_date']
    fields = ['name', 'is_active']
    pass
