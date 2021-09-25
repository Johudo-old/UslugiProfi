from subcategory.serializers.nested import SimplifiedSubcategoriesSeriaizer
from category.serializers.nested import SimplifiedCategoriesSeriaizer
from category.models import CategoryModel
from rest_framework import serializers


class CategoriesSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = CategoryModel
        fields = ('id', 'name')


class CategoriesWithSubcategoriesSeriaizer(serializers.ModelSerializer):
    subcategories = SimplifiedSubcategoriesSeriaizer(many=True)

    class Meta:
        model = CategoryModel
        fields = ['id', 'name', 'subcategories']

    # @staticmethod
    # def get_subcategories(category):
    #     sub = SubcategoryModel.objects.filter(category_id=category.id)
    #     return SubcategoriesSeriaizer(sub, many=True).data
