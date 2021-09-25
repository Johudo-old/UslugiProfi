from category.serializers.nested import SimplifiedCategoriesSeriaizer
from subcategory.models import SubcategoryModel
from rest_framework import serializers


class SubcategoriesSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = SubcategoryModel
        fields = ('id', 'name')


class SubcategoriesWithCategorySeriaizer(serializers.ModelSerializer):
    category = SimplifiedCategoriesSeriaizer()

    class Meta:
        model = SubcategoryModel
        fields = ('id', 'name', 'category')
