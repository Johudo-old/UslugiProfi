from user.models import UserModel
from django.contrib import admin


@admin.register(UserModel)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "surname", "type", "company", "phone")
    fields = ["email", "name", "surname", "type", "phone", "company", "address", "ogrn", "inn", "avatar"]
    pass
