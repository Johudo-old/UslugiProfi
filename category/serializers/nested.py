from category.models import CategoryModel
from rest_framework import serializers


class SimplifiedCategoriesSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = CategoryModel
        fields = ('id', 'name')
